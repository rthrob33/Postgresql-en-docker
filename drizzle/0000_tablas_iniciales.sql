CREATE TYPE "public"."estado_tarea" AS ENUM('pendiente', 'en_progreso', 'terminada');--> statement-breakpoint
CREATE TABLE "tareas" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"descripcion" text,
	"estado" "estado_tarea" DEFAULT 'pendiente' NOT NULL,
	"usuario_id" integer NOT NULL,
	"creada_en" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"correo" text NOT NULL,
	"creado_en" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_correo_unique" UNIQUE("correo")
);
--> statement-breakpoint
ALTER TABLE "tareas" ADD CONSTRAINT "tareas_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
