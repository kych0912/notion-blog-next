import { v4 as uuidv4 } from 'uuid';
import { asc, eq } from 'drizzle-orm';

import { db } from '@/app/server/db/drizzle';
import * as schema from '@/app/server/db/schema';

export async function getCategories() {
  const data = await db.select().from(schema.Category).orderBy(asc(schema.Category.name));
  return data;
}

export async function getPostCategory(postId: string) {
  const data = await db
    .select({
      id: schema.Category.id,
      name: schema.Category.name,
    })
    .from(schema.post)
    .innerJoin(schema.Category, eq(schema.post.category, schema.Category.id))
    .where(eq(schema.post.id, postId))
    .limit(1);
  return data[0] ?? null;
}

export async function getPostCategories(id: string) {
  const data = await db
    .select()
    .from(schema.Category)
    .innerJoin(schema.post, eq(schema.post.category, schema.Category.id))
    .where(eq(schema.post.id, id));
  return data[0] ?? null;
}

export async function getUserPostCategories(userName: string) {
  return db
    .select({
      id: schema.Category.id,
      name: schema.Category.name,
      createdAt: schema.Category.createdAt,
      updatedAt: schema.Category.updatedAt,
    })
    .from(schema.user)
    .innerJoin(schema.post, eq(schema.post.authorId, schema.user.id))
    .innerJoin(schema.Category, eq(schema.post.category, schema.Category.id))
    .where(eq(schema.user.name, userName))
    .groupBy(
      schema.Category.id,
      schema.Category.name,
      schema.Category.createdAt,
      schema.Category.updatedAt,
    )
    .orderBy(asc(schema.Category.name));
}

export async function createCategory(name: string) {
  const data = await db.insert(schema.Category).values({ id: uuidv4(), name }).returning();
  return data[0] ?? null;
}

export async function updatePostCategory(postId: string, categoryId: string | null) {
  const data = await db
    .update(schema.post)
    .set({ category: categoryId })
    .where(eq(schema.post.id, postId))
    .returning();
  return data[0] ?? null;
}

export async function deleteCategory(id: string) {
  return db.delete(schema.Category).where(eq(schema.Category.id, id));
}

export async function deleteCategoryAndUnsetPostsCategory(categoryId: string) {
  return db.transaction(async (tx) => {
    // 카테고리 삭제 시 해당 카테고리를 사용하는 모든 게시물의 카테고리를 초기화
    await tx
      .update(schema.post)
      .set({ category: null })
      .where(eq(schema.post.category, categoryId));

    // 카테고리 삭제
    return tx.delete(schema.Category).where(eq(schema.Category.id, categoryId));
  });
}
