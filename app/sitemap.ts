import type { MetadataRoute } from 'next';

import { META } from '@/app/constants/metadata';
import { getPostPath, getUserPath } from '@/app/components/MetaData/getMetaData';
import { getSitemapPosts } from '@/app/server/queries/sitemap-posts';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSitemapPosts();
  const authors = [...new Set(posts.map((post) => post.author))];

  // Notion edits are not tracked in the database, so omit unreliable lastmod dates.
  return [
    { url: `${META.url}/` },
    ...authors.map((author) => ({ url: new URL(getUserPath(author), META.url).toString() })),
    ...posts.map((post) => ({
      url: new URL(getPostPath(post.author, post.id), META.url).toString(),
    })),
  ];
}
