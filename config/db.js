import pg from "pg";
import dotenv from "dotenv";
const {Pool} = pg;

dotenv.config();
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const port = process.env.DB_PORT;

// export const db = new Pool({
//   port,
//   user,
//   host,
//   password,
//   database,
// });

export default db;