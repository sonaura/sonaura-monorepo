import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@sonaura/database/schema';

export const getDatabaseInstance = (databaseUrl: string) => {
  const sql = neon(databaseUrl);
  return drizzle(sql, {
    casing: 'snake_case',
    schema,
  });
};

export type Database = ReturnType<typeof drizzle<typeof schema>>;
