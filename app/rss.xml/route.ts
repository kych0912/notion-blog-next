import { buildRss } from '@/app/lib/rss';
import { getRssPosts } from '@/app/server/queries/public-posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = await getRssPosts();
  return new Response(buildRss(posts), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
