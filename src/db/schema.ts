import { pgTable, pgEnum, serial, text, integer, timestamp } from 'drizzle-orm/pg-core'

// Estados posibles de una tarea
export const estadoTarea = pgEnum('estado_tarea', ['pendiente', 'en_progreso', 'terminada'])

// Tabla de usuarios
export const usuarios = pgTable('usuarios', {
  id: serial('id').primaryKey(),
  nombre: text('nombre').notNull(),
  correo: text('correo').notNull().unique(),
  creadoEn: timestamp('creado_en').notNull().defaultNow(),
})

// Tabla de tareas (cada tarea pertenece a un usuario)
export const tareas = pgTable('tareas', {
  id: serial('id').primaryKey(),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion'),
  estado: estadoTarea('estado').notNull().default('pendiente'),
  usuarioId: integer('usuario_id')
    .notNull()
    .references(() => usuarios.id, { onDelete: 'cascade' }),
  creadaEn: timestamp('creada_en').notNull().defaultNow(),
})

export type Usuario = typeof usuarios.$inferSelect
export type Tarea = typeof tareas.$inferSelect
export type NuevaTarea = typeof tareas.$inferInsert
