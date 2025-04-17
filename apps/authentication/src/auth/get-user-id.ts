import { AppType } from '@/types/app.types';
import { getDatabaseInstance } from '@/db';
import { users } from '@sonaura/database/schema';
import { Context } from 'hono';

export async function getUserId(
  email: string,
  c: Context<AppType>,
): Promise<{ id: string; role: string }> {
  const databaseUrl = c.env.DATABASE_URL;

  const db = getDatabaseInstance(databaseUrl);

  const existingUser = await db.query.users.findFirst({
    columns: {
      id: true,
      role: true,
    },
    where: (users, { eq }) => eq(users.email, email),
  });

  if (existingUser) {
    return existingUser;
  }

  const createdUser = await db
    .insert(users)
    .values({
      email,
    })
    .returning({ id: users.id, role: users.role });

  if (!createdUser[0]) {
    throw new Error('Could not create user');
  }

  return createdUser[0];
}
