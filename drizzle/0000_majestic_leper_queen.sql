-- Origen: Postgresql_en_docker/drizzle/0000_majestic_leper_queen.sql
-- Migración generada por drizzle-kit a partir de src/db/schema.ts
CREATE TYPE "public"."rol" AS ENUM('admin', 'editor', 'lector');--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"nombre" text NOT NULL,
	"password_hash" text NOT NULL,
	"rol" "rol" DEFAULT 'lector' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
