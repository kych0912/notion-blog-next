import { eq } from 'drizzle-orm';

import { db } from '@/app/server/db/drizzle';
import { post, user } from '@/app/server/db/schema';

export async function getSitemapPosts() {
  // Resolve current author names so renamed users do not produce stale URLs.
  return db
    .select({ id: post.id, author: user.name })
    .from(post)
    .innerJoin(user, eq(post.authorId, user.id));
}
