import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Test the database connection
pool.connect()
  .then(client => {
    console.log(" Database connected successfully");
    client.release(); // release back to pool
  })
  .catch(err => {
    console.error(" Database connection error", err.stack);
  });
