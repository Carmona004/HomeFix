
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "HomeFix API",
      version: "1.0.0",
      description:
        "Documentação da API do sistema HomeFix para gerenciamento de solicitações de manutenção em condomínios.",
    },

    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor local",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Informe o token JWT obtido no login.",
        },
      },
    },

    paths: {
      // INÍCIO

      "/": {
        get: {
          summary: "Verificar funcionamento da API",
          tags: ["Início"],
          responses: {
            200: {
              description: "API funcionando corretamente.",
            },
          },
        },
      },

      // AUTENTICAÇÃO

      "/moradores/login": {
        post: {
          summary: "Realizar login do morador",
          tags: ["Autenticação"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      example: "ana.oliveira.teste@example.com",
                    },
                    password: {
                      type: "string",
                      example: "SuaSenhaAqui",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login realizado com sucesso. Retorna o token JWT.",
            },
            400: {
              description: "E-mail e senha são obrigatórios.",
            },
            401: {
              description: "E-mail ou senha inválidos.",
            },
            500: {
              description: "Erro ao realizar login.",
            },
          },
        },
      },

      // MORADORES

      "/moradores": {
        get: {
          summary: "Listar todos os moradores",
          tags: ["Moradores"],
          responses: {
            200: {
              description: "Lista de moradores retornada com sucesso.",
            },
            500: {
              description: "Erro ao listar moradores.",
            },
          },
        },

        post: {
          summary: "Cadastrar novo morador",
          tags: ["Moradores"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password", "apartment"],
                  properties: {
                    name: {
                      type: "string",
                      example: "Ana Oliveira",
                    },
                    email: {
                      type: "string",
                      example: "ana.oliveira@example.com",
                    },
                    password: {
                      type: "string",
                      example: "Senha@2026",
                    },
                    apartment: {
                      type: "string",
                      example: "102",
                    },
                    block: {
                      type: "string",
                      example: "A",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Morador cadastrado com sucesso.",
            },
            400: {
              description: "Dados inválidos.",
            },
            409: {
              description: "E-mail já cadastrado.",
            },
            500: {
              description: "Erro ao cadastrar morador.",
            },
          },
        },
      },

      "/moradores/perfil": {
        get: {
          summary: "Consultar perfil do morador autenticado",
          tags: ["Moradores"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Perfil do morador retornado com sucesso.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            404: {
              description: "Morador não encontrado.",
            },
            500: {
              description: "Erro ao buscar perfil.",
            },
          },
        },
      },

      "/moradores/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID do morador.",
          },
        ],

        get: {
          summary: "Buscar morador por ID",
          tags: ["Moradores"],
          responses: {
            200: {
              description: "Morador encontrado.",
            },
            400: {
              description: "ID inválido.",
            },
            404: {
              description: "Morador não encontrado.",
            },
            500: {
              description: "Erro ao buscar morador.",
            },
          },
        },

        put: {
          summary: "Atualizar dados do morador",
          tags: ["Moradores"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "apartment"],
                  properties: {
                    name: {
                      type: "string",
                      example: "Ana Oliveira",
                    },
                    email: {
                      type: "string",
                      example: "ana.oliveira@example.com",
                    },
                    password: {
                      type: "string",
                      example: "NovaSenha@2026",
                      description: "Opcional para alterar a senha.",
                    },
                    apartment: {
                      type: "string",
                      example: "102",
                    },
                    block: {
                      type: "string",
                      example: "A",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Morador atualizado com sucesso.",
            },
            400: {
              description: "Dados inválidos.",
            },
            404: {
              description: "Morador não encontrado.",
            },
            409: {
              description: "E-mail já cadastrado.",
            },
            500: {
              description: "Erro ao atualizar morador.",
            },
          },
        },

        delete: {
          summary: "Excluir morador",
          tags: ["Moradores"],
          responses: {
            200: {
              description: "Morador excluído com sucesso.",
            },
            400: {
              description: "ID inválido.",
            },
            404: {
              description: "Morador não encontrado.",
            },
            409: {
              description: "Morador possui solicitações vinculadas.",
            },
            500: {
              description: "Erro ao excluir morador.",
            },
          },
        },
      },

      // PROFISSIONAIS

      "/funcionarios": {
        get: {
          summary: "Listar todos os profissionais",
          tags: ["Profissionais"],
          responses: {
            200: {
              description: "Lista de profissionais retornada com sucesso.",
            },
            500: {
              description: "Erro ao buscar profissionais.",
            },
          },
        },
      },

      "/teste-profissionais": {
        get: {
          summary: "Testar listagem de profissionais",
          tags: ["Profissionais"],
          responses: {
            200: {
              description: "Listagem realizada com sucesso.",
            },
            500: {
              description: "Erro ao listar profissionais.",
            },
          },
        },
      },

      "/profissionais": {
        post: {
          summary: "Cadastrar profissional",
          tags: ["Profissionais"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "specialty"],
                  properties: {
                    name: {
                      type: "string",
                      example: "João Silva",
                    },
                    specialty: {
                      type: "string",
                      example: "Encanador",
                    },
                    description: {
                      type: "string",
                      example: "Reparos hidráulicos e vazamentos",
                    },
                    phone: {
                      type: "string",
                      example: "(11) 90000-0001",
                    },
                    active: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Profissional cadastrado com sucesso.",
            },
            400: {
              description: "Dados inválidos.",
            },
            500: {
              description: "Erro ao cadastrar profissional.",
            },
          },
        },
      },

      "/profissionais/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID do profissional.",
          },
        ],

        get: {
          summary: "Buscar profissional por ID",
          tags: ["Profissionais"],
          responses: {
            200: {
              description: "Profissional encontrado.",
            },
            400: {
              description: "ID inválido.",
            },
            404: {
              description: "Profissional não encontrado.",
            },
            500: {
              description: "Erro ao buscar profissional.",
            },
          },
        },

        put: {
          summary: "Atualizar profissional",
          tags: ["Profissionais"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "specialty"],
                  properties: {
                    name: {
                      type: "string",
                      example: "João Silva",
                    },
                    specialty: {
                      type: "string",
                      example: "Encanador",
                    },
                    description: {
                      type: "string",
                      example: "Reparos hidráulicos",
                    },
                    phone: {
                      type: "string",
                      example: "(11) 90000-0001",
                    },
                    active: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Profissional atualizado com sucesso.",
            },
            400: {
              description: "Dados inválidos.",
            },
            404: {
              description: "Profissional não encontrado.",
            },
            500: {
              description: "Erro ao atualizar profissional.",
            },
          },
        },

        delete: {
          summary: "Excluir profissional",
          tags: ["Profissionais"],
          responses: {
            200: {
              description: "Profissional excluído com sucesso.",
            },
            400: {
              description: "ID inválido.",
            },
            404: {
              description: "Profissional não encontrado.",
            },
            409: {
              description: "Profissional possui categorias vinculadas.",
            },
            500: {
              description: "Erro ao excluir profissional.",
            },
          },
        },
      },

      // CATEGORIAS

      "/categorias": {
        get: {
          summary: "Listar todas as categorias",
          tags: ["Categorias"],
          responses: {
            200: {
              description: "Lista de categorias retornada com sucesso.",
            },
            500: {
              description: "Erro ao listar categorias.",
            },
          },
        },

        post: {
          summary: "Cadastrar categoria",
          tags: ["Categorias"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "professional_id"],
                  properties: {
                    name: {
                      type: "string",
                      example: "hidraulica",
                    },
                    professional_id: {
                      type: "integer",
                      example: 1,
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Categoria cadastrada com sucesso.",
            },
            400: {
              description: "Dados inválidos ou profissional inexistente.",
            },
            500: {
              description: "Erro ao cadastrar categoria.",
            },
          },
        },
      },

      "/categorias/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID da categoria.",
          },
        ],

        get: {
          summary: "Buscar categoria por ID",
          tags: ["Categorias"],
          responses: {
            200: {
              description: "Categoria encontrada.",
            },
            400: {
              description: "ID inválido.",
            },
            404: {
              description: "Categoria não encontrada.",
            },
            500: {
              description: "Erro ao buscar categoria.",
            },
          },
        },

        put: {
          summary: "Atualizar categoria",
          tags: ["Categorias"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "professional_id"],
                  properties: {
                    name: {
                      type: "string",
                      example: "hidraulica",
                    },
                    professional_id: {
                      type: "integer",
                      example: 1,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Categoria atualizada com sucesso.",
            },
            400: {
              description: "Dados inválidos ou profissional inexistente.",
            },
            404: {
              description: "Categoria não encontrada.",
            },
            500: {
              description: "Erro ao atualizar categoria.",
            },
          },
        },

        delete: {
          summary: "Excluir categoria",
          tags: ["Categorias"],
          responses: {
            200: {
              description: "Categoria excluída com sucesso.",
            },
            400: {
              description: "ID inválido.",
            },
            404: {
              description: "Categoria não encontrada.",
            },
            409: {
              description: "Categoria possui solicitações vinculadas.",
            },
            500: {
              description: "Erro ao excluir categoria.",
            },
          },
        },
      },

      // SOLICITAÇÕES

      "/solicitacoes": {
        post: {
          summary: "Cadastrar solicitação de serviço",
          tags: ["Solicitações"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["description", "category_id"],
                  properties: {
                    description: {
                      type: "string",
                      example: "Estou com um vazamento na pia da cozinha.",
                    },
                    category_id: {
                      type: "integer",
                      example: 1,
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Solicitação cadastrada com sucesso.",
            },
            400: {
              description: "Descrição ou categoria inválida.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            404: {
              description: "Categoria não encontrada ou profissional indisponível.",
            },
            500: {
              description: "Erro ao cadastrar solicitação.",
            },
          },
        },

        get: {
          summary: "Listar solicitações do morador autenticado",
          tags: ["Solicitações"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Solicitações do morador retornadas com sucesso.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            500: {
              description: "Erro ao listar solicitações.",
            },
          },
        },
      },

      "/solicitacoes/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID da solicitação.",
          },
        ],

        get: {
          summary: "Buscar solicitação por ID",
          tags: ["Solicitações"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Solicitação encontrada.",
            },
            400: {
              description: "ID da solicitação inválido.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            404: {
              description: "Solicitação não encontrada.",
            },
            500: {
              description: "Erro ao buscar solicitação.",
            },
          },
        },
      },

      // MENSAGENS

      "/solicitacoes/{id}/mensagens": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID da solicitação.",
          },
        ],

        post: {
          summary: "Enviar mensagem do morador",
          tags: ["Mensagens"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: {
                      type: "string",
                      example: "Olá, gostaria de saber como está meu atendimento.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Mensagem enviada com sucesso.",
            },
            400: {
              description: "ID inválido ou mensagem vazia.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            404: {
              description: "Solicitação não encontrada.",
            },
            500: {
              description: "Erro ao enviar mensagem.",
            },
          },
        },

        get: {
          summary: "Consultar histórico de mensagens",
          tags: ["Mensagens"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Histórico de mensagens retornado em ordem cronológica.",
            },
            400: {
              description: "ID da solicitação inválido.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            404: {
              description: "Solicitação não encontrada.",
            },
            500: {
              description: "Erro ao consultar histórico.",
            },
          },
        },
      },

      // CHATBOT

      "/solicitacoes/{id}/chatbot": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            description: "ID da solicitação.",
          },
        ],

        post: {
          summary: "Enviar mensagem ao chatbot HomeFix",
          description:
            "Analisa a descrição do problema por palavras-chave, identifica a categoria e indica um profissional ativo quando possível.",
          tags: ["Chatbot"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: {
                      type: "string",
                      example: "Estou com um vazamento na pia da cozinha.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Atendimento do chatbot realizado com sucesso.",
              content: {
                "application/json": {
                  example: {
                    mensagem: "Atendimento do chatbot realizado com sucesso.",
                    mensagem_enviada: {
                      id: 11,
                      service_request_id: 1,
                      sender: "resident",
                      message: "Estou com um vazamento na pia da cozinha.",
                    },
                    resposta_chatbot: {
                      id: 12,
                      service_request_id: 1,
                      sender: "bot",
                      message:
                        "Identifiquei que seu problema é da área de hidraulica. O profissional indicado é João Silva, especialista em Encanador.",
                    },
                    profissional_indicado: {
                      id: 1,
                      nome: "João Silva",
                      especialidade: "Encanador",
                      telefone: "(11) 90000-0001",
                    },
                  },
                },
              },
            },
            400: {
              description: "ID inválido ou mensagem vazia.",
            },
            401: {
              description: "Token ausente ou inválido.",
            },
            404: {
              description: "Solicitação não encontrada.",
            },
            500: {
              description: "Erro ao processar mensagem do chatbot.",
            },
          },
        },
      },
    },
  },

  apis: ["./src/server.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
