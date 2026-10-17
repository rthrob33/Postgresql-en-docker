import { pool } from './db/conexion'
import * as servicio from './servicios/tareas.servicio'
import * as tareasRepo from './repositorios/tareas.repositorio'
import * as usuariosRepo from './repositorios/usuarios.repositorio'

// Pequeña demostración del servicio conectado al repositorio
async function main() {
  const roberth = await usuariosRepo.obtenerPorCorreo('roberth@correo.com')
  if (!roberth) {
    throw new Error('No hay datos, corre primero: npm run db:seed')
  }

  console.log('--- Tareas actuales ---')
  console.table(await servicio.listarTareas())

  console.log('--- Creando una tarea nueva ---')
  const nueva = await servicio.crearTarea('Subir el proyecto a GitHub', roberth.id, 'Con el README')
  console.log('Creada:', nueva.titulo)

  console.log('--- Terminando la tarea ---')
  const terminada = await servicio.terminarTarea(nueva.id)
  console.log('Estado ahora:', terminada.estado)

  console.log('--- Probando una regla del servicio ---')
  try {
    await servicio.terminarTarea(nueva.id)
  } catch (error) {
    console.log('Error esperado:', (error as Error).message)
  }

  console.log(`--- Tareas de ${roberth.nombre} ---`)
  console.table(await tareasRepo.obtenerPorUsuario(roberth.id))

  await servicio.borrarTarea(nueva.id)
  console.log('Tarea de prueba borrada')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => pool.end())
