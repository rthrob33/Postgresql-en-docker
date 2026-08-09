// Origen: Postgresql_en_docker/src/db/index.ts
// Reescrito: script de siembra (seed) de datos iniciales, separado de la conexión.
import bcrypt from 'bcryptjs'
import { db, pool } from './client'
import { usuarios } from './schema'

async function seed() {
    const passwordHash = await bcrypt.hash('123456', 10)

    await db.insert(usuarios).values([
        {
            email: 'admin@correo.com',
            nombre: 'Administrador',
            passwordHash,
            rol: 'admin',
        },
        {
            email: 'editor@correo.com',
            nombre: 'Editor',
            passwordHash,
            rol: 'editor',
        },
        {
            email: 'lector@correo.com',
            nombre: 'Lector',
            passwordHash,
            rol: 'lector',
        },
    ])

    console.log('Seed completado correctamente')
    await pool.end()
}

seed().catch(async (error) => {
    console.error('Error al ejecutar el seed:', error)
    await pool.end()
    process.exit(1)
})
