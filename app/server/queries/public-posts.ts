import { and, desc, eq, getTableColumns, ne, sql } from 'drizzle-orm';

import { db } from '@/app/server/db/drizzle';
import * as schema from '@/app/server/db/schema';
import type { PostType } from '@/app/server/db/schema';

const columns = {
  ...getTableColumns(schema.post),
  author: sql<string>`coalesce(${schema.user.name}, ${schema.post.author})`,
};

export async function getRssPosts() {
  return db
    .select({ ...columns, categoryName: schema.Category.name })
    .from(schema.post)
    .leftJoin(schema.user, eq(schema.user.id, schema.post.authorId))
    .leftJoin(schema.Category, eq(schema.Category.id, schema.post.category))
    .orderBy(desc(schema.post.date), schema.post.id)
    .limit(50);
}

export async function getRelatedPosts(post: PostType) {
  return db
    .select(columns)
    .from(schema.post)
    .leftJoin(schema.user, eq(schema.user.id, schema.post.authorId))
    .where(
      and(
        ne(schema.post.id, post.id),
        post.category
          ? eq(schema.post.category, post.category)
          : post.authorId
            ? eq(schema.post.authorId, post.authorId)
            : eq(schema.post.author, post.author),
      ),
    )
    .orderBy(desc(schema.post.date), schema.post.id)
    .limit(3);
}
