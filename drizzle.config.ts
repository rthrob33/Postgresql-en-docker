// Origen: Postgresql_en_docker/drizzle.config.ts
// Configura drizzle-kit para generar las migraciones a partir de src/db/schema.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
})
