import pg from 'pg';
import dotenv from 'dotenv';


dotenv.config()

const { Pool } = pg;

const configDb = {
    connectionString: process.env.DATABASE_URL,
};

if(process.env.MODE === "prod") configDb.ssl = true;

export const db = new Pool(configDb);