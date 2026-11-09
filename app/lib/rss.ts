import { META } from '@/app/constants/metadata';

interface RssPost {
  id: string;
  author: string;
  title: string | null;
  description: string | null;
  date: string;
  categoryName?: string | null;
}

export function escapeXml(text: string) {
  return text
    .toWellFormed()
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildRss(posts: RssPost[]) {
  const site = new URL('/', META.url).toString();
  const feed = new URL('/rss.xml', META.url).toString();
  const items = posts
    .map((post) => {
      const url = new URL(
        `/${encodeURIComponent(post.author)}/${encodeURIComponent(post.id)}`,
        META.url,
      ).toString();
      return `<item>
      <title>${escapeXml(post.title || '제목 없는 글')}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description ?? '')}</description>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.categoryName ? `<category>${escapeXml(post.categoryName)}</category>` : ''}
    </item>`;
    })
    .join('\n');
  const latest = posts.reduce((date, post) => Math.max(date, Date.parse(post.date)), 0);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(META.siteName)}</title>
    <link>${escapeXml(site)}</link>
    <description>${escapeXml(META.description)}</description>
    <language>ko-KR</language>
    <atom:link href="${escapeXml(feed)}" rel="self" type="application/rss+xml" />
    ${latest ? `<lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>` : ''}
    ${items}
  </channel>
</rss>`;
}
