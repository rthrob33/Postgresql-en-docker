import { eq } from 'drizzle-orm'
import { db } from '../db/conexion'
import { tareas, usuarios, NuevaTarea } from '../db/schema'

// El repositorio solo habla con la base de datos, no tiene reglas de negocio

export async function obtenerTodas() {
  return db.select().from(tareas)
}

export async function obtenerPorId(id: number) {
  const resultado = await db.select().from(tareas).where(eq(tareas.id, id))
  return resultado[0]
}

export async function obtenerPorUsuario(usuarioId: number) {
  return db.select().from(tareas).where(eq(tareas.usuarioId, usuarioId))
}

// Trae cada tarea junto con el nombre de su usuario
export async function obtenerConUsuario() {
  return db
    .select({
      id: tareas.id,
      titulo: tareas.titulo,
      estado: tareas.estado,
      usuario: usuarios.nombre,
    })
    .from(tareas)
    .innerJoin(usuarios, eq(tareas.usuarioId, usuarios.id))
}

export async function crear(datos: NuevaTarea) {
  const resultado = await db.insert(tareas).values(datos).returning()
  return resultado[0]
}

export async function cambiarEstado(id: number, estado: NuevaTarea['estado']) {
  const resultado = await db.update(tareas).set({ estado }).where(eq(tareas.id, id)).returning()
  return resultado[0]
}

export async function eliminar(id: number) {
  const resultado = await db.delete(tareas).where(eq(tareas.id, id)).returning()
  return resultado[0]
}
