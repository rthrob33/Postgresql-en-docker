// Origen: Postgresql_en_docker/src/db/schema.ts
// Reescrito: define el esquema de la tabla "usuarios" con Drizzle ORM (pg-core).
// A partir de este archivo se genera la migración con drizzle-kit.
import { pgTable, pgEnum, text, uuid, timestamp } from 'drizzle-orm/pg-core'

// Enum de roles disponibles para un usuario del sistema.
export const rolEnum = pgEnum('rol', [
    'admin', 'editor', 'lector',
])

// Tabla principal de usuarios.
export const usuarios = pgTable('usuarios', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    nombre: text('nombre').notNull(),
    passwordHash: text('password_hash').notNull(),
    rol: rolEnum('rol').notNull().default('lector'),
    creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
})

// Tipos inferidos para usar en el resto de la aplicación.
export type Usuario = typeof usuarios.$inferSelect
export type NuevoUsuario = typeof usuarios.$inferInsert
