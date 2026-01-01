'use server';
import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/app/server/db/drizzle';
import * as schema from '@/app/server/db/schema';
import type { PostType } from '@/app/server/db/schema';

export async function uploadPost(Post: PostType) {
  const postData = {
    id: Post.id,
    author: Post.author,
    date: new Date(Post.date).toISOString(),
    image: Post.image,
    title: Post.title,
    avatar: Post.avatar,
    description: Post.description,
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
  const data = await db
    .select()
    .from(schema.post)
    .where(eq(schema.post.author, name))
    .orderBy(desc(schema.post.date));

  return data;
}

export async function getPostDetail(id: string, user: string) {
  const data = await db
    .select()
    .from(schema.post)
    .where(and(eq(schema.post.id, id), eq(schema.post.author, user)));

  return data;
}

export async function deletePost(id: string) {
  const data = await db.delete(schema.post).where(eq(schema.post.id, id)).returning();

  return data;
}
