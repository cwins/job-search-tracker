import { eq } from 'drizzle-orm';
import { db } from '../db-connection';
import { users } from '../db-schema';

export async function getUserByUsername(username: string) {
  const results = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return results[0] || null;
}

export async function createUser(input: { username: string; passwordHash: string }) {
  const results = await db
    .insert(users)
    .values({ username: input.username, passwordHash: input.passwordHash })
    .returning();

  return results[0] || null;
}
