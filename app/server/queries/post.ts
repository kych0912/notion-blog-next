'use server';
import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/app/server/db/drizzle';
import * as schema from '@/app/server/db/schema';
import type { PostType } from '@/app/server/db/schema';

export async function uploadPost(Post: PostType) {
  const postData = {
    id: Post.id,
    author: Post.author,
    authorId: Post.authorId,
    date: new Date(Post.date).toISOString(),
    image: Post.image,
    title: Post.title,
    avatar: Post.avatar,
    description: Post.description,
    category: Post.category ?? null,
  };

  const data = await db.insert(schema.post).values(postData).returning();

  return data;
}

export async function getPostById(id: string) {
  const data = await db.select().from(schema.post).where(eq(schema.post.id, id));

  return data;
}

export async function getLatestPosts(page: number) {
  const offset = (page - 1) * 10;

  const data = await db
    .select()
    .from(schema.post)
    .orderBy(desc(schema.post.date))
    .limit(10)
    .offset(offset);

  return data;
}

export async function getUserPosts(name: string) {
  const decodedName = decodeURIComponent(name ?? '');
  const userRow = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.name, decodedName))
    .limit(1);

  const userId = userRow[0]?.id;
  if (!userId) return [];

  return db
    .select()
    .from(schema.post)
    .where(eq(schema.post.authorId, userId))
    .orderBy(desc(schema.post.date));
}

export async function getPostDetail(id: string, user: string) {
  const decodedName = decodeURIComponent(user ?? '');
  const userRow = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.name, decodedName))
    .limit(1);

  const userId = userRow[0]?.id;
  if (!userId) return [];

  return db
    .select()
    .from(schema.post)
    .where(and(eq(schema.post.id, id), eq(schema.post.authorId, userId)));
}

export async function deletePost(id: string) {
  const data = await db.delete(schema.post).where(eq(schema.post.id, id)).returning();

  return data;
}
