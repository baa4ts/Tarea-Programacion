const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
});

async function connectWithRetry(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await client.connect();
      console.log("Conectado a la base de datos PostgreSQL");
      return;
    } catch (err) {
      console.error(
        `Error de conexión a PostgreSQL, reintentando en ${delay}ms... (${i + 1
        }/${retries})`,
        err.stack
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  console.error("No se pudo conectar a PostgreSQL después de varios intentos");
  process.exit(1);
}

connectWithRetry();

module.exports = client;
