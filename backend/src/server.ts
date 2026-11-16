
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/database";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado no arquivo .env");
}

// ==========================================
// 1. CONFIGURAÇÕES E MIDDLEWARES
// ==========================================

app.use(cors());
app.use(express.json());

// DOCUMENTAÇÃO SWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  console.log(`REQUISIÇÃO: ${req.method} ${req.url}`);
  next();
});

// ==========================================
// 2. AUTENTICAÇÃO JWT
// ==========================================

const autenticarToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      mensagem: "Token não informado. Faça login para continuar.",
    });
  }

  const partes = authorization.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer" || !partes[1]) {
    return res.status(401).json({
      mensagem: "Formato de token inválido. Utilize Bearer TOKEN.",
    });
  }

  try {
    const decoded = jwt.verify(partes[1], JWT_SECRET) as jwt.JwtPayload;

    if (typeof decoded.id !== "number") {
      return res.status(401).json({
        mensagem: "Token inválido.",
      });
    }

    res.locals.moradorId = decoded.id;
    next();
  } catch {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado.",
    });
  }
};

// ==========================================
// 3. ROTA INICIAL
// ==========================================

app.get("/", (req, res) => {
  res.json({
    mensagem: "API HomeFix funcionando!",
    porta: PORT,
  });
});

// ==========================================
// 4. PROFISSIONAIS
// ==========================================

// LISTAR PROFISSIONAIS
app.get("/funcionarios", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM public.professionals ORDER BY id"
    );

    const banco = await pool.query(
      "SELECT current_database() AS banco"
    );

    const esquema = await pool.query(
      "SELECT current_schema() AS esquema"
    );

    res.json({
      banco: banco.rows[0].banco,
      esquema: esquema.rows[0].esquema,
      quantidade: resultado.rowCount,
      profissionais: resultado.rows,
    });
  } catch (erro) {
    console.error("Erro ao buscar funcionários:", erro);
    res.status(500).json({
      mensagem: "Erro ao buscar funcionários.",
    });
  }
});

// TESTE DE LISTAGEM
app.get("/teste-profissionais", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM public.professionals ORDER BY id"
    );

    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao listar profissionais.",
    });
  }
});

// CADASTRAR PROFISSIONAL
app.post("/profissionais", async (req, res) => {
  try {
    const { name, specialty, description, phone, active } = req.body;

    if (!name || !specialty) {
      return res.status(400).json({
        mensagem: "Nome e especialidade são obrigatórios.",
      });
    }

    if (active !== undefined && typeof active !== "boolean") {
      return res.status(400).json({
        mensagem: "O campo active deve ser verdadeiro ou falso.",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO public.professionals
       (name, specialty, description, phone, active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        specialty,
        description || null,
        phone || null,
        active ?? true,
      ]
    );

    res.status(201).json({
      mensagem: "Profissional cadastrado com sucesso.",
      profissional: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao cadastrar profissional:", erro);
    res.status(500).json({
      mensagem: "Erro ao cadastrar profissional.",
    });
  }
});

// BUSCAR PROFISSIONAL POR ID
app.get("/profissionais/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do profissional inválido.",
      });
    }

    const resultado = await pool.query(
      "SELECT * FROM public.professionals WHERE id = $1",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Profissional não encontrado.",
      });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao buscar profissional.",
    });
  }
});

// ATUALIZAR PROFISSIONAL
app.put("/profissionais/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, specialty, description, phone, active } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do profissional inválido.",
      });
    }

    if (!name || !specialty) {
      return res.status(400).json({
        mensagem: "Nome e especialidade são obrigatórios.",
      });
    }

    if (active !== undefined && typeof active !== "boolean") {
      return res.status(400).json({
        mensagem: "O campo active deve ser verdadeiro ou falso.",
      });
    }

    const resultado = await pool.query(
      `UPDATE public.professionals
       SET name = $1,
           specialty = $2,
           description = $3,
           phone = $4,
           active = $5
       WHERE id = $6
       RETURNING *`,
      [
        name,
        specialty,
        description || null,
        phone || null,
        active ?? true,
        id,
      ]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Profissional não encontrado.",
      });
    }

    res.json({
      mensagem: "Profissional atualizado com sucesso.",
      profissional: resultado.rows[0],
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao atualizar profissional.",
    });
  }
});

// EXCLUIR PROFISSIONAL
app.delete("/profissionais/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do profissional inválido.",
      });
    }

    const resultado = await pool.query(
      "DELETE FROM public.professionals WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Profissional não encontrado.",
      });
    }

    res.json({
      mensagem: "Profissional excluído com sucesso.",
      profissional: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error(erro);

    if (erro.code === "23503") {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir este profissional porque existem categorias vinculadas a ele.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao excluir profissional.",
    });
  }
});

// ==========================================
// 5. CATEGORIAS
// ==========================================

// LISTAR CATEGORIAS
app.get("/categorias", async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT
         c.id,
         c.name,
         c.professional_id,
         p.name AS professional_name,
         p.specialty
       FROM public.problem_categories c
       LEFT JOIN public.professionals p
         ON c.professional_id = p.id
       ORDER BY c.id`
    );

    res.json({
      quantidade: resultado.rowCount,
      categorias: resultado.rows,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao listar categorias.",
    });
  }
});

// BUSCAR CATEGORIA POR ID
app.get("/categorias/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID da categoria inválido.",
      });
    }

    const resultado = await pool.query(
      `SELECT
         c.id,
         c.name,
         c.professional_id,
         p.name AS professional_name,
         p.specialty
       FROM public.problem_categories c
       LEFT JOIN public.professionals p
         ON c.professional_id = p.id
       WHERE c.id = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada.",
      });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao buscar categoria.",
    });
  }
});

// CADASTRAR CATEGORIA
app.post("/categorias", async (req, res) => {
  try {
    const { name, professional_id } = req.body;
    const profissionalId = Number(professional_id);

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(profissionalId) ||
      profissionalId <= 0
    ) {
      return res.status(400).json({
        mensagem: "Informe um nome e um ID de profissional válido.",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO public.problem_categories
       (name, professional_id)
       VALUES ($1, $2)
       RETURNING *`,
      [name.trim(), profissionalId]
    );

    res.status(201).json({
      mensagem: "Categoria cadastrada com sucesso.",
      categoria: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error(erro);

    if (erro.code === "23503") {
      return res.status(400).json({
        mensagem: "O profissional informado não existe.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao cadastrar categoria.",
    });
  }
});

// ATUALIZAR CATEGORIA
app.put("/categorias/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, professional_id } = req.body;
    const profissionalId = Number(professional_id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID da categoria inválido.",
      });
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(profissionalId) ||
      profissionalId <= 0
    ) {
      return res.status(400).json({
        mensagem: "Informe um nome e um ID de profissional válido.",
      });
    }

    const resultado = await pool.query(
      `UPDATE public.problem_categories
       SET name = $1,
           professional_id = $2
       WHERE id = $3
       RETURNING *`,
      [name.trim(), profissionalId, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada.",
      });
    }

    res.json({
      mensagem: "Categoria atualizada com sucesso.",
      categoria: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error(erro);

    if (erro.code === "23503") {
      return res.status(400).json({
        mensagem: "O profissional informado não existe.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao atualizar categoria.",
    });
  }
});

// EXCLUIR CATEGORIA
app.delete("/categorias/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID da categoria inválido.",
      });
    }

    const resultado = await pool.query(
      "DELETE FROM public.problem_categories WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Categoria não encontrada.",
      });
    }

    res.json({
      mensagem: "Categoria excluída com sucesso.",
      categoria: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error(erro);

    if (erro.code === "23503") {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir esta categoria porque existem solicitações vinculadas a ela.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao excluir categoria.",
    });
  }
});

// ==========================================
// 6. MORADORES
// ==========================================

// LISTAR MORADORES
app.get("/moradores", async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT id, name, email, apartment, block, created_at
       FROM public.residents
       ORDER BY id`
    );

    res.json({
      quantidade: resultado.rowCount,
      moradores: resultado.rows,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao listar moradores.",
    });
  }
});

// CADASTRAR MORADOR
app.post("/moradores", async (req, res) => {
  try {
    const { name, email, password, apartment, block } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !apartment
    ) {
      return res.status(400).json({
        mensagem:
          "Nome, e-mail, senha e apartamento são obrigatórios.",
      });
    }

    if (typeof password !== "string") {
      return res.status(400).json({
        mensagem: "A senha deve ser um texto válido.",
      });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        mensagem: "A senha não pode ultrapassar 72 bytes.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

    const resultado = await pool.query(
      `INSERT INTO public.residents
       (name, email, password, apartment, block)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, apartment, block, created_at`,
      [
        name,
        email,
        senhaCriptografada,
        apartment,
        block || null,
      ]
    );

    res.status(201).json({
      mensagem: "Morador cadastrado com sucesso.",
      morador: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error("Erro ao cadastrar morador:", erro);

    if (erro.code === "23505") {
      return res.status(409).json({
        mensagem: "Este e-mail já está cadastrado.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao cadastrar morador.",
    });
  }
});

// LOGIN COM BCRYPT E JWT
app.post("/moradores/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensagem: "E-mail e senha são obrigatórios.",
      });
    }

    const resultado = await pool.query(
      "SELECT * FROM public.residents WHERE email = $1",
      [email]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos.",
      });
    }

    const morador = resultado.rows[0];

    const senhaValida = await bcrypt.compare(
      password,
      morador.password
    );

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos.",
      });
    }

    const token = jwt.sign(
      {
        id: morador.id,
        email: morador.email,
      },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.json({
      mensagem: "Login realizado com sucesso.",
      token,
      morador: {
        id: morador.id,
        name: morador.name,
        email: morador.email,
        apartment: morador.apartment,
        block: morador.block,
        created_at: morador.created_at,
      },
    });
  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({
      mensagem: "Erro ao realizar login.",
    });
  }
});

// PERFIL DO MORADOR — PROTEGIDO
app.get("/moradores/perfil", autenticarToken, async (req, res) => {
  try {
    const moradorId = res.locals.moradorId;

    const resultado = await pool.query(
      `SELECT id, name, email, apartment, block, created_at
       FROM public.residents
       WHERE id = $1`,
      [moradorId]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Morador não encontrado.",
      });
    }

    res.json({
      mensagem: "Acesso autorizado.",
      morador: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao buscar perfil:", erro);
    res.status(500).json({
      mensagem: "Erro ao buscar perfil do morador.",
    });
  }
});

// BUSCAR MORADOR POR ID
app.get("/moradores/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do morador inválido.",
      });
    }

    const resultado = await pool.query(
      `SELECT id, name, email, apartment, block, created_at
       FROM public.residents
       WHERE id = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Morador não encontrado.",
      });
    }

    res.json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: "Erro ao buscar morador.",
    });
  }
});

// ATUALIZAR MORADOR
app.put("/moradores/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password, apartment, block } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do morador inválido.",
      });
    }

    if (!name || !email || !apartment) {
      return res.status(400).json({
        mensagem: "Nome, e-mail e apartamento são obrigatórios.",
      });
    }

    let resultado;

    if (password !== undefined && password !== "") {
      if (typeof password !== "string") {
        return res.status(400).json({
          mensagem: "A senha deve ser um texto válido.",
        });
      }

      if (Buffer.byteLength(password, "utf8") > 72) {
        return res.status(400).json({
          mensagem: "A senha não pode ultrapassar 72 bytes.",
        });
      }

      const senhaCriptografada = await bcrypt.hash(
        password,
        SALT_ROUNDS
      );

      resultado = await pool.query(
        `UPDATE public.residents
         SET name = $1,
             email = $2,
             password = $3,
             apartment = $4,
             block = $5
         WHERE id = $6
         RETURNING id, name, email, apartment, block, created_at`,
        [
          name,
          email,
          senhaCriptografada,
          apartment,
          block || null,
          id,
        ]
      );
    } else {
      resultado = await pool.query(
        `UPDATE public.residents
         SET name = $1,
             email = $2,
             apartment = $3,
             block = $4
         WHERE id = $5
         RETURNING id, name, email, apartment, block, created_at`,
        [name, email, apartment, block || null, id]
      );
    }

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Morador não encontrado.",
      });
    }

    res.json({
      mensagem: "Morador atualizado com sucesso.",
      morador: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error("Erro ao atualizar morador:", erro);

    if (erro.code === "23505") {
      return res.status(409).json({
        mensagem: "Este e-mail já está cadastrado.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao atualizar morador.",
    });
  }
});

// EXCLUIR MORADOR
app.delete("/moradores/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID do morador inválido.",
      });
    }

    const resultado = await pool.query(
      `DELETE FROM public.residents
       WHERE id = $1
       RETURNING id, name, email, apartment, block`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Morador não encontrado.",
      });
    }

    res.json({
      mensagem: "Morador excluído com sucesso.",
      morador: resultado.rows[0],
    });
  } catch (erro: any) {
    console.error(erro);

    if (erro.code === "23503") {
      return res.status(409).json({
        mensagem:
          "Não é possível excluir este morador porque existem solicitações vinculadas a ele.",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao excluir morador.",
    });
  }
});

// ==========================================
// 7. SOLICITAÇÕES DE SERVIÇO
// ==========================================

// CADASTRAR SOLICITAÇÃO
app.post("/solicitacoes", autenticarToken, async (req, res) => {
  try {
    const { description, category_id } = req.body;
    const residentId = res.locals.moradorId;
    const categoryId = Number(category_id);

    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      !Number.isInteger(categoryId) ||
      categoryId <= 0
    ) {
      return res.status(400).json({
        mensagem:
          "Informe uma descrição válida e o ID de uma categoria.",
      });
    }

    const categoria = await pool.query(
      `SELECT
         c.id,
         c.name,
         c.professional_id,
         p.name AS professional_name,
         p.specialty
       FROM public.problem_categories c
       INNER JOIN public.professionals p
         ON c.professional_id = p.id
       WHERE c.id = $1
         AND p.active = true`,
      [categoryId]
    );

    if (categoria.rows.length === 0) {
      return res.status(404).json({
        mensagem:
          "Categoria não encontrada ou profissional indisponível.",
      });
    }

    const categoriaEncontrada = categoria.rows[0];

    const resultado = await pool.query(
      `INSERT INTO public.service_requests
       (description, category_id, professional_id, status, created_at, resident_id)
       VALUES ($1, $2, $3, $4, NOW(), $5)
       RETURNING *`,
      [
        description.trim(),
        categoriaEncontrada.id,
        categoriaEncontrada.professional_id,
        "aberta",
        residentId,
      ]
    );

    res.status(201).json({
      mensagem: "Solicitação cadastrada com sucesso.",
      solicitacao: resultado.rows[0],
      categoria: categoriaEncontrada.name,
      profissional: categoriaEncontrada.professional_name,
      especialidade: categoriaEncontrada.specialty,
    });
  } catch (erro) {
    console.error("Erro ao cadastrar solicitação:", erro);
    res.status(500).json({
      mensagem: "Erro ao cadastrar solicitação.",
    });
  }
});

// LISTAR SOLICITAÇÕES DO MORADOR
app.get("/solicitacoes", autenticarToken, async (req, res) => {
  try {
    const moradorId = res.locals.moradorId;

    const resultado = await pool.query(
      `SELECT
         s.id,
         s.description,
         s.status,
         s.created_at,
         c.name AS category,
         p.name AS professional,
         p.specialty
       FROM public.service_requests s
       LEFT JOIN public.problem_categories c
         ON s.category_id = c.id
       LEFT JOIN public.professionals p
         ON s.professional_id = p.id
       WHERE s.resident_id = $1
       ORDER BY s.created_at DESC`,
      [moradorId]
    );

    res.json({
      quantidade: resultado.rowCount,
      solicitacoes: resultado.rows,
    });
  } catch (erro) {
    console.error("Erro ao listar solicitações:", erro);
    res.status(500).json({
      mensagem: "Erro ao listar solicitações.",
    });
  }
});

// BUSCAR SOLICITAÇÃO POR ID
app.get("/solicitacoes/:id", autenticarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const moradorId = res.locals.moradorId;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID da solicitação inválido.",
      });
    }

    const resultado = await pool.query(
      `SELECT
         s.id,
         s.description,
         s.status,
         s.created_at,
         c.name AS category,
         p.name AS professional,
         p.specialty
       FROM public.service_requests s
       LEFT JOIN public.problem_categories c
         ON s.category_id = c.id
       LEFT JOIN public.professionals p
         ON s.professional_id = p.id
       WHERE s.id = $1
         AND s.resident_id = $2`,
      [id, moradorId]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Solicitação não encontrada.",
      });
    }

    res.json({
      mensagem: "Solicitação encontrada.",
      solicitacao: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao buscar solicitação:", erro);
    res.status(500).json({
      mensagem: "Erro ao buscar solicitação.",
    });
  }
});

// ==========================================
// 7.1 FINALIZAR SOLICITAÇÃO
// ==========================================

// FINALIZAR SOLICITAÇÃO DO MORADOR AUTENTICADO
app.patch("/solicitacoes/:id/finalizar", autenticarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const moradorId = res.locals.moradorId;

    // Verifica se o ID da solicitação é válido
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensagem: "ID da solicitação inválido.",
      });
    }

    // Atualiza somente uma solicitação pertencente ao morador logado
    const resultado = await pool.query(
      `UPDATE public.service_requests
       SET status = $1
       WHERE id = $2
         AND resident_id = $3
       RETURNING id, description, status, created_at`,
      ["concluida", id, moradorId]
    );

    // Verifica se a solicitação foi encontrada
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Solicitação não encontrada para este morador.",
      });
    }

    // Retorna a confirmação da finalização
    return res.status(200).json({
      mensagem: "Solicitação finalizada com sucesso.",
      solicitacao: resultado.rows[0],
    });

  } catch (erro) {
    console.error("Erro ao finalizar solicitação:", erro);

    return res.status(500).json({
      mensagem: "Erro ao finalizar solicitação.",
    });
  }
});

// ==========================================
// 8. MENSAGENS DO ATENDIMENTO
// ==========================================

// ENVIAR MENSAGEM DO MORADOR
app.post(
  "/solicitacoes/:id/mensagens",
  autenticarToken,
  async (req, res) => {
    try {
      const solicitacaoId = Number(req.params.id);
      const moradorId = res.locals.moradorId;
      const { message } = req.body;

      if (
        !Number.isInteger(solicitacaoId) ||
        solicitacaoId <= 0
      ) {
        return res.status(400).json({
          mensagem: "ID da solicitação inválido.",
        });
      }

      if (
        typeof message !== "string" ||
        message.trim() === ""
      ) {
        return res.status(400).json({
          mensagem: "A mensagem não pode estar vazia.",
        });
      }

      // Verifica se a solicitação pertence ao morador
      const solicitacao = await pool.query(
        `SELECT id
         FROM public.service_requests
         WHERE id = $1 AND resident_id = $2`,
        [solicitacaoId, moradorId]
      );

      if (solicitacao.rows.length === 0) {
        return res.status(404).json({
          mensagem: "Solicitação não encontrada.",
        });
      }

      // Salva a mensagem
      const resultado = await pool.query(
        `INSERT INTO public.chat_messages
         (service_request_id, sender, message, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING id, service_request_id, sender, message, created_at`,
        [solicitacaoId, "resident", message.trim()]
      );

      res.status(201).json({
        mensagem: "Mensagem enviada com sucesso.",
        mensagem_enviada: resultado.rows[0],
      });
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
      res.status(500).json({
        mensagem: "Erro ao enviar mensagem.",
      });
    }
  }
);

// CONSULTAR HISTÓRICO DE MENSAGENS
app.get(
  "/solicitacoes/:id/mensagens",
  autenticarToken,
  async (req, res) => {
    try {
      const solicitacaoId = Number(req.params.id);
      const moradorId = res.locals.moradorId;

      if (
        !Number.isInteger(solicitacaoId) ||
        solicitacaoId <= 0
      ) {
        return res.status(400).json({
          mensagem: "ID da solicitação inválido.",
        });
      }

      // Confirma que a solicitação pertence ao morador
      const solicitacao = await pool.query(
        `SELECT id
         FROM public.service_requests
         WHERE id = $1 AND resident_id = $2`,
        [solicitacaoId, moradorId]
      );

      if (solicitacao.rows.length === 0) {
        return res.status(404).json({
          mensagem: "Solicitação não encontrada.",
        });
      }

      // Busca as mensagens em ordem cronológica
      const resultado = await pool.query(
        `SELECT
           id,
           service_request_id,
           sender,
           message,
           created_at
         FROM public.chat_messages
         WHERE service_request_id = $1
         ORDER BY created_at ASC, id ASC`,
        [solicitacaoId]
      );

      res.status(200).json({
        mensagem: "Histórico carregado com sucesso.",
        quantidade: resultado.rowCount,
        mensagens: resultado.rows,
      });
    } catch (erro) {
      console.error("Erro ao consultar mensagens:", erro);
      res.status(500).json({
        mensagem: "Erro ao consultar histórico de mensagens.",
      });
    }
  }
);

// ==========================================
// 9. CHATBOT HOMEFIX
// ==========================================

// NORMALIZAR TEXTO PARA IDENTIFICAR PALAVRAS-CHAVE
const normalizarTexto = (texto: string): string => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

// ATENDER MENSAGEM PELO CHATBOT
app.post(
  "/solicitacoes/:id/chatbot",
  autenticarToken,
  async (req, res) => {
    try {
      const solicitacaoId = Number(req.params.id);
      const moradorId = res.locals.moradorId;
      const { message } = req.body;

      if (!Number.isInteger(solicitacaoId) || solicitacaoId <= 0) {
        return res.status(400).json({
          mensagem: "ID da solicitação inválido.",
        });
      }

      if (typeof message !== "string" || message.trim() === "") {
        return res.status(400).json({
          mensagem: "Digite uma mensagem para o chatbot.",
        });
      }

      const mensagemNormalizada = normalizarTexto(message);

      // Verifica se a solicitação pertence ao morador
      const solicitacao = await pool.query(
        `SELECT id
         FROM public.service_requests
         WHERE id = $1 AND resident_id = $2`,
        [solicitacaoId, moradorId]
      );

      if (solicitacao.rows.length === 0) {
        return res.status(404).json({
          mensagem: "Solicitação não encontrada.",
        });
      }

      // Salva a mensagem enviada pelo morador
      const mensagemMorador = await pool.query(
        `INSERT INTO public.chat_messages
         (service_request_id, sender, message, created_at)
         VALUES ($1, 'resident', $2, NOW())
         RETURNING id, service_request_id, sender, message, created_at`,
        [solicitacaoId, message.trim()]
      );

      // Palavras relacionadas a cada categoria
      const palavrasChave: Record<string, string[]> = {
        hidraulica: [
          "vazamento",
          "torneira",
          "pia",
          "cano",
          "encanamento",
          "descarga",
          "chuveiro",
          "agua",
          "registro",
          "esgoto",
          "ralo",
        ],

        eletrica: [
          "tomada",
          "lampada",
          "luz",
          "energia",
          "eletrica",
          "disjuntor",
          "fio",
          "curto circuito",
          "interruptor",
          "choque",
          "fiação",
        ],

        pintura: [
          "pintura",
          "parede",
          "tinta",
          "pintar",
          "mofo",
          "descascando",
          "descascada",
          "infiltracao",
        ],
      };

      // Conta quantas palavras de cada categoria aparecem
      const pontuacao: Record<string, number> = {
        hidraulica: 0,
        eletrica: 0,
        pintura: 0,
      };

      for (const categoria in palavrasChave) {
        for (const palavra of palavrasChave[categoria]) {
          const palavraNormalizada = normalizarTexto(palavra);

          if (mensagemNormalizada.includes(palavraNormalizada)) {
            pontuacao[categoria]++;
          }
        }
      }

      const maiorPontuacao = Math.max(
        ...Object.values(pontuacao)
      );

      let respostaChatbot = "";
      let profissionalIndicado = null;

      // Caso nenhuma categoria seja identificada
      if (maiorPontuacao === 0) {
        respostaChatbot =
          "Olá! Ainda não consegui identificar o tipo de problema. Você poderia explicar melhor? Por exemplo: é um vazamento, um problema com tomada ou uma parede precisando de pintura?";
      } else {
        // Identifica as categorias com maior pontuação
        const categoriasEncontradas = Object.entries(
          pontuacao
        ).filter(([, pontos]) => pontos === maiorPontuacao);

        // Caso exista empate entre categorias
        if (categoriasEncontradas.length > 1) {
          respostaChatbot =
            "Identifiquei mais de um possível tipo de problema. Você poderia explicar melhor se precisa de um reparo hidráulico, elétrico ou de pintura?";
        } else {
          const categoriaIdentificada = categoriasEncontradas[0][0];

          // Busca a categoria e o profissional no banco
          const resultadoProfissional = await pool.query(
            `SELECT
               c.id AS category_id,
               c.name AS category_name,
               p.id AS professional_id,
               p.name AS professional_name,
               p.specialty,
               p.phone
             FROM public.problem_categories c
             INNER JOIN public.professionals p
               ON c.professional_id = p.id
             WHERE TRANSLATE(
  LOWER(c.name),
  'áàãâäéèêëíìîïóòõôöúùûüç',
  'aaaaaeeeeiiiiooooouuuuc'
) = $1
               AND p.active = TRUE
             LIMIT 1`,
            [categoriaIdentificada]
          );

          if (resultadoProfissional.rows.length === 0) {
            respostaChatbot =
              "Identifiquei o tipo do problema, mas não encontrei um profissional ativo para essa categoria no momento. Por favor, entre em contato com a administração do condomínio.";
          } else {
            const profissional = resultadoProfissional.rows[0];

            // Atualiza a solicitação com a categoria e o profissional
            await pool.query(
              `UPDATE public.service_requests
               SET category_id = $1,
                   professional_id = $2
               WHERE id = $3
                 AND resident_id = $4`,
              [
                profissional.category_id,
                profissional.professional_id,
                solicitacaoId,
                moradorId,
              ]
            );

            profissionalIndicado = {
              id: profissional.professional_id,
              nome: profissional.professional_name,
              especialidade: profissional.specialty,
              telefone: profissional.phone,
            };

            respostaChatbot =
              `Identifiquei que seu problema é da área de ${profissional.category_name}. ` +
              `O profissional indicado é ${profissional.professional_name}, ` +
              `especialista em ${profissional.specialty}.`;
          }
        }
      }

      // Salva a resposta do chatbot no histórico
      const mensagemBot = await pool.query(
        `INSERT INTO public.chat_messages
         (service_request_id, sender, message, created_at)
         VALUES ($1, 'bot', $2, NOW())
         RETURNING id, service_request_id, sender, message, created_at`,
        [solicitacaoId, respostaChatbot]
      );

      res.status(200).json({
        mensagem: "Atendimento do chatbot realizado com sucesso.",
        mensagem_enviada: mensagemMorador.rows[0],
        resposta_chatbot: mensagemBot.rows[0],
        profissional_indicado: profissionalIndicado,
      });
    } catch (erro) {
      console.error("Erro no chatbot:", erro);

      res.status(500).json({
        mensagem: "Erro ao processar a mensagem do chatbot.",
      });
    }
  }
);

// ==========================================
// 10. ROTA NÃO ENCONTRADA
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    mensagem: "Rota não encontrada.",
    metodo: req.method,
    caminho: req.originalUrl,
  });
});

// ==========================================
// 11. INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log(`Servidor HomeFix rodando em http://localhost:${PORT}`);
  console.log("Login com bcrypt habilitado.");
  console.log("Autenticação JWT habilitada.");
  console.log("Rotas de solicitações e mensagens habilitadas.");
  console.log("Chatbot HomeFix habilitado.");
});