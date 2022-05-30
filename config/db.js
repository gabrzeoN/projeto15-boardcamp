import pg from "pg";
import dotenv from "dotenv";
const {Pool} = pg;

dotenv.config();
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});

if(process.env.MODE === "PROD"){
    db.ssl = {
        rejectUnauthorized: false
    }
}

export default db;