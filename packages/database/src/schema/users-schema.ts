import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const rolesEnum = pgEnum('roles', ['visitor', 'editor', 'admin']);

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  email: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  role: rolesEnum().notNull().default('visitor'),
});
