'use server';
import { and, desc, eq, isNull, or, ilike, getTableColumns, sql } from 'drizzle-orm';

import { db } from '@/app/server/db/drizzle';
import * as schema from '@/app/server/db/schema';
import type { PostType } from '@/app/server/db/schema';
import { escapeSearchPattern, normalizeSearchTerm, SEARCH_PAGE_SIZE } from '@/app/lib/search';

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

export async function updatePostMetadata(
  id: string,
  authorId: string | null,
  metadata: Pick<PostType, 'title' | 'image' | 'description'>,
) {
  const [post] = await db
    .update(schema.post)
    .set(metadata)
    .where(
      and(
        eq(schema.post.id, id),
        authorId ? eq(schema.post.authorId, authorId) : isNull(schema.post.authorId),
      ),
    )
    .returning();
  return post ?? null;
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

export async function searchPosts(query: string, page = 1, author = '') {
  const term = normalizeSearchTerm(query);
  if (!term) return { posts: [], hasNextPage: false };
  const pattern = escapeSearchPattern(term);
  const pageNumber = Number.isSafeInteger(page) ? Math.min(1000, Math.max(1, page)) : 1;
  const posts = await db
    .select({
      ...getTableColumns(schema.post),
      author: sql<string>`coalesce(${schema.user.name}, ${schema.post.author})`,
      categoryName: schema.Category.name,
    })
    .from(schema.post)
    .leftJoin(schema.Category, eq(schema.Category.id, schema.post.category))
    .leftJoin(schema.user, eq(schema.user.id, schema.post.authorId))
    .where(
      and(
        or(
          ilike(schema.post.title, pattern),
          ilike(schema.post.description, pattern),
          ilike(schema.Category.name, pattern),
        ),
        author
          ? or(
              eq(schema.user.name, author),
              and(isNull(schema.post.authorId), eq(schema.post.author, author)),
            )
          : undefined,
      ),
    )
    .orderBy(desc(schema.post.date), schema.post.id)
    .limit(SEARCH_PAGE_SIZE + 1)
    .offset((pageNumber - 1) * SEARCH_PAGE_SIZE);
  return { posts: posts.slice(0, SEARCH_PAGE_SIZE), hasNextPage: posts.length > SEARCH_PAGE_SIZE };
}
