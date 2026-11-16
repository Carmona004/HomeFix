
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function testarConexao() {
  try {
    const resultado = await pool.query(`
      SELECT
        current_database() AS banco,
        current_user AS usuario,
        inet_server_addr() AS servidor,
        inet_server_port() AS porta,
        to_regclass('public.professionals') AS tabela
    `);

    console.log("RESULTADO DA CONEXÃO:");
    console.table(resultado.rows);

    const profissionais = await pool.query(`
      SELECT * FROM public.professionals ORDER BY id
    `);

    console.log("PROFISSIONAIS ENCONTRADOS:");
    console.table(profissionais.rows);

  } catch (erro) {
    console.error("ERRO NA CONEXÃO:", erro);
  } finally {
    await pool.end();
  }
}

testarConexao();
