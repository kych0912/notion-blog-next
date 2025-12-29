'use server';
import { eq } from 'drizzle-orm';

import * as schema from '@/app/server/db/schema';
import { db } from '@/app/server/db/drizzle';
import type { UserType } from '@/app/server/db/schema';

export async function findUserByName(name: string) {
  try {
    const data = await db.select().from(schema.user).where(eq(schema.user.name, name)).limit(1);

    return data[0] || null;
  } catch (err) {
    throw err;
  }
}

export async function getUserInfoAndPostByName(name: string): Promise<UserType | null> {
  const data = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.name, decodeURIComponent(name)))
    .limit(1);
  return data[0];
}

export async function getUserInfoById(id: string) {
  try {
    const data = await db.select().from(schema.user).where(eq(schema.user.id, id));

    return data;
  } catch (err: unknown) {
    throw err;
  }
}

export async function updateUser(id: string, name: string, avatar: string, email: string) {
  try {
    const data = await db
      .update(schema.user)
      .set({ name, avatar, email })
      .where(eq(schema.user.id, id))
      .returning();

    return data;
  } catch (err: unknown) {
    throw err;
  }
}
