import * as repositorio from '../repositorios/tareas.repositorio'

// El servicio tiene las reglas y usa el repositorio para llegar a la base de datos

export async function listarTareas() {
  return repositorio.obtenerConUsuario()
}

export async function crearTarea(titulo: string, usuarioId: number, descripcion?: string) {
  if (titulo.trim() === '') {
    throw new Error('El título no puede estar vacío')
  }
  return repositorio.crear({ titulo: titulo.trim(), descripcion, usuarioId })
}

export async function terminarTarea(id: number) {
  const tarea = await repositorio.obtenerPorId(id)
  if (!tarea) {
    throw new Error(`No existe la tarea ${id}`)
  }
  if (tarea.estado === 'terminada') {
    throw new Error('La tarea ya estaba terminada')
  }
  return repositorio.cambiarEstado(id, 'terminada')
}

export async function borrarTarea(id: number) {
  const tarea = await repositorio.eliminar(id)
  if (!tarea) {
    throw new Error(`No existe la tarea ${id}`)
  }
  return tarea
}
