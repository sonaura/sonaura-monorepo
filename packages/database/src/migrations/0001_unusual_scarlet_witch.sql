CREATE TYPE "public"."roles" AS ENUM('visitor', 'editor', 'admin');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'visitor';