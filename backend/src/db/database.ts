import { Database } from "./types";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME || "homethrive",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD || "password",
  }),
});

export const db = new Kysely<Database>({ dialect });
