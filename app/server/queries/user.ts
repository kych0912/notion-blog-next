'use server';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import * as schema from '@/app/server/db/schema';
import { db } from '@/app/server/db/drizzle';

const saltRounds = 10;

export async function findUserByName(name: string) {
  try {
    const data = await db.select().from(schema.user).where(eq(schema.user.name, name)).limit(1);

    return data[0] || null;
  } catch (err) {
    throw err;
  }
}

export async function comparePassword(password: string, hash: string) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err: unknown) {
    throw err;
  }
}

export async function createUser(
  id: string,
  name: string,
  password: string,
  avatar: string,
  email: string,
) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const data = await db
      .insert(schema.user)
      .values({ id, name, password: hashedPassword, avatar, email })
      .returning();

    return data;
  } catch (err: unknown) {
    throw err;
  }
}

export async function getUserInfoAndPostByName(name: string) {
  try {
    const data = await db.select().from(schema.user).where(eq(schema.user.name, name));

    return data;
  } catch (err: unknown) {
    throw err;
  }
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
