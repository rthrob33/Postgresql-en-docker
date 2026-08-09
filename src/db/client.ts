// Origen: Postgresql_en_docker/src/db/index.ts
// Reescrito: separa la conexión a la base de datos (reutilizable) del script de seed.
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool)
