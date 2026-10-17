import { eq } from 'drizzle-orm'
import { db } from '../db/conexion'
import { usuarios } from '../db/schema'

export async function obtenerPorCorreo(correo: string) {
  const resultado = await db.select().from(usuarios).where(eq(usuarios.correo, correo))
  return resultado[0]
}
