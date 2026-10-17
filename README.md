# PostgreSQL en Docker + Drizzle

**Nombre:** Roberth Melendez
**Carnet:** 2500461

Tarea: levantar PostgreSQL en Docker y crear el esquema con Drizzle ORM.
El proyecto es un gestor de tareas sencillo con dos tablas: `usuarios` y `tareas`.

## Requisitos

- Docker Desktop
- Node.js 20 o superior

## Pasos

### 1. Levantar PostgreSQL en Docker

```bash
cp .env.example .env
npm install
npm run docker:up
```

Esto crea el contenedor `postgres-tareas` (imagen `postgres:16`) con la base `tareas_db`, usuario `roberth` y puerto `5432`. Los datos quedan guardados en un volumen de Docker.

### 2. Schema (`src/db/schema.ts`)

- Enum `estado_tarea`: `pendiente`, `en_progreso`, `terminada`
- Tabla `usuarios`: id, nombre, correo (único), creado_en
- Tabla `tareas`: id, titulo, descripcion, estado, usuario_id (llave foránea a `usuarios`), creada_en

### 3. Generar y aplicar la migración

```bash
npm run db:generar   # crea el SQL en la carpeta drizzle/
npm run db:migrar    # lo ejecuta en la base de datos
```

La migración ya generada está en `drizzle/0000_tablas_iniciales.sql`.

### 4. Sembrar datos

```bash
npm run db:seed
```

Borra lo que haya y crea 3 usuarios y 5 tareas de prueba. Se puede correr varias veces.

### 5. Conectar un servicio con el repositorio

```bash
npm start
```

La estructura es por capas:

```
src/
├── db/
│   ├── schema.ts        # tablas
│   ├── conexion.ts      # conexión a Postgres
│   └── seed.ts          # datos de prueba
├── repositorios/        # consultas a la base de datos
│   ├── tareas.repositorio.ts
│   └── usuarios.repositorio.ts
├── servicios/
│   └── tareas.servicio.ts   # reglas de negocio, usa el repositorio
└── index.ts             # demo que usa el servicio
```

El servicio (`tareas.servicio.ts`) valida las reglas (por ejemplo, no crear tareas sin título ni terminar una tarea que ya está terminada) y llama al repositorio, que es el único que habla con la base de datos. `npm start` lista las tareas, crea una, la termina, prueba una regla y la borra.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run docker:up` | Levanta Postgres en Docker |
| `npm run docker:down` | Apaga el contenedor |
| `npm run db:generar` | Genera la migración |
| `npm run db:migrar` | Aplica la migración |
| `npm run db:seed` | Siembra datos de prueba |
| `npm start` | Corre la demo del servicio |
