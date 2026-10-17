import { sql } from 'drizzle-orm'
import { db, pool } from './conexion'
import { usuarios, tareas } from './schema'

async function sembrar() {
  // Limpio primero (y reinicio los ids) para poder correr el seed varias veces
  await db.execute(sql`TRUNCATE TABLE tareas, usuarios RESTART IDENTITY`)

  const usuariosCreados = await db
    .insert(usuarios)
    .values([
      { nombre: 'Roberth Melendez', correo: 'roberth@correo.com' },
      { nombre: 'Ana Lopez', correo: 'ana@correo.com' },
      { nombre: 'Carlos Perez', correo: 'carlos@correo.com' },
    ])
    .returning()

  const [roberth, ana, carlos] = usuariosCreados

  await db.insert(tareas).values([
    { titulo: 'Levantar Postgres en Docker', estado: 'terminada', usuarioId: roberth.id },
    { titulo: 'Escribir el schema.ts', estado: 'terminada', usuarioId: roberth.id },
    { titulo: 'Generar la migración', estado: 'en_progreso', usuarioId: roberth.id },
    { titulo: 'Estudiar para el parcial', descripcion: 'Bases de datos', usuarioId: ana.id },
    { titulo: 'Entregar la tarea en GitHub', usuarioId: carlos.id },
  ])

  console.log('Datos de prueba creados: 3 usuarios y 5 tareas')
}

sembrar()
  .catch((error) => {
    console.error('Error al sembrar:', error)
    process.exitCode = 1
  })
  .finally(() => pool.end())
