
import "dotenv/config";
import { Pool } from "pg";

console.log("CONFIGURAÇÃO DO POSTGRESQL:");
console.log("Host:", process.env.DB_HOST);
console.log("Porta:", process.env.DB_PORT);
console.log("Banco:", process.env.DB_NAME);
console.log("Usuário:", process.env.DB_USER);

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Conexão com PostgreSQL estabelecida!");
});
