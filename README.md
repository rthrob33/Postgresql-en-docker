# PostgreSQL en Docker + Drizzle ORM

Proyecto reescrito a partir del código funcional extraído de `Postgresql_en_docker/` (el .zip subido). Cada archivo indica en su encabezado de qué carpeta/archivo original proviene.

## Origen del código

| Archivo nuevo | Extraído de |
|---|---|
| `docker-compose.yml` | `Postgresql_en_docker/docker-compose.yml` |
| `drizzle.config.ts` | `Postgresql_en_docker/drizzle.config.ts` |
| `src/db/schema.ts` | `Postgresql_en_docker/src/db/schema.ts` |
| `src/db/client.ts` | `Postgresql_en_docker/src/db/index.ts` (conexión separada del seed) |
| `src/db/seed.ts` | `Postgresql_en_docker/src/db/index.ts` (lógica de seed separada) |
| `drizzle/0000_majestic_leper_queen.sql` | `Postgresql_en_docker/drizzle/0000_majestic_leper_queen.sql` |
| `drizzle/meta/*` | `Postgresql_en_docker/drizzle/meta/*` |
| `package.json`, `tsconfig.json`, `.gitignore` | equivalentes en `Postgresql_en_docker/` |

Cambios respecto al original: se corrigieron dos typos (`rolEmun` → `rolEnum`, `NuevoUsuairo` → `NuevoUsuario`), se separó la conexión a la base de datos (`client.ts`) del script de siembra (`seed.ts`), y se agregaron scripts de npm para cada paso del flujo.

## 1. Levantar PostgreSQL en Docker

```bash
docker compose up -d
# o: npm run db:up
```

Esto crea un contenedor `postgres17` (imagen `postgres:17`) con la base `producto`, usuario `dev` y password `dev`, expuesto en el puerto `5432`, con datos persistidos en el volumen `postgres_data`.

## 2. Esquema (`src/db/schema.ts`)

Define la tabla `usuarios` (id, email, nombre, password_hash, rol, creado_en) y el enum `rol` (`admin`, `editor`, `lector`) usando Drizzle ORM.

## 3. Generar la migración

```bash
cp .env.example .env   # ajustar si es necesario
npm install
npm run db:generate    # drizzle-kit generate
npm run db:migrate     # drizzle-kit migrate
```

## 4. Sembrar datos

```bash
npm run db:seed        # tsx src/db/seed.ts
```

Inserta 3 usuarios de ejemplo (`admin@correo.com`, `editor@correo.com`, `lector@correo.com`), todos con password `123456` (hasheado con bcrypt).

## 5. Conectar un servicio

Cualquier servicio Node/TypeScript puede importar la conexión ya configurada:

```ts
import { db } from './src/db/client'
import { usuarios } from './src/db/schema'

const todos = await db.select().from(usuarios)
```
