"use server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import * as schema from "@/app/db/schema";
import { db } from "@/app/db/drizzle";

const saltRounds = 10;

export async function findUserByName(name: string) {
  try {
    const data = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.name, name))
      .limit(1);

    return data[0] || null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function comparePassword(password: string, hash: string) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function generateToken(id: string) {
  const token = jwt.sign({ id }, "SECRET_KEY", { expiresIn: "3d" });
  return token;
}

export async function createUser(
  id: string,
  name: string,
  password: string,
  avatar: string,
  email: string
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
    const data = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.name, name));

    return data;
  } catch (err: unknown) {
    throw err;
  }
}

export async function getUserInfoById(id: string) {
  try {
    const data = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id));

    return data;
  } catch (err: unknown) {
    throw err;
  }
}
