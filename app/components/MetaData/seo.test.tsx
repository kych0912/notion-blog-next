import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, expect, it, vi } from 'vitest';

import { META } from '@/app/constants/metadata';
import sitemap from '@/app/sitemap';
import { getSitemapPosts } from '@/app/server/queries/sitemap-posts';

import { getDescription, getMetadata, getPostPath } from './getMetaData';
import JsonLd from './JsonLd';

vi.mock('@/app/server/queries/sitemap-posts', () => ({ getSitemapPosts: vi.fn() }));

afterEach(() => vi.unstubAllEnvs());

it('keeps the homepage canonical out of inherited layout metadata', () => {
  expect(getMetadata().alternates).toBeUndefined();
  expect(getMetadata({ asPath: '/' }).alternates?.canonical).toBe(`${META.url}/`);
});

it('uses the actual encoded article route consistently across search and sharing metadata', () => {
  const metadata = getMetadata({
    title: '검색 최적화',
    asPath: getPostPath('김 개발자', 'post-id'),
    type: 'article',
    ogImage: '/Image/Post.png',
  });
  const url = `${META.url}/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90/post-id`;

  expect(metadata.alternates?.canonical).toBe(url);
  expect(metadata.openGraph).toMatchObject({
    url,
    type: 'article',
    siteName: 'NextBlog',
    images: [{ url: `${META.url}/Image/Post.png` }],
  });
  expect(metadata.twitter).toMatchObject({
    card: 'summary_large_image',
    title: metadata.title,
    images: [{ url: `${META.url}/Image/Post.png` }],
  });
});

it('normalizes descriptions and bounds long Notion paragraphs', () => {
  expect(getDescription(' 첫 문단\n\n 다음 문단  ')).toBe('첫 문단 다음 문단');
  expect(getDescription(' ')).toBe(META.description);
  expect(getDescription('긴 본문 '.repeat(100))).toHaveLength(160);
});

it('only emits search verification tokens supplied by the deployment', () => {
  vi.stubEnv('GOOGLE_SITE_VERIFICATION', '');
  vi.stubEnv('NAVER_SITE_VERIFICATION', '');
  expect(getMetadata().verification).toEqual({ google: undefined, other: undefined });

  vi.stubEnv('GOOGLE_SITE_VERIFICATION', 'google-token');
  vi.stubEnv('NAVER_SITE_VERIFICATION', 'naver-token');
  expect(getMetadata().verification).toEqual({
    google: 'google-token',
    other: { 'naver-site-verification': 'naver-token' },
  });
});

it('keeps user-authored text inside the structured data script', () => {
  const headline = '</script><script>alert("test")</script>';
  const html = renderToStaticMarkup(<JsonLd data={{ '@type': 'BlogPosting', headline }} />);

  expect(html.match(/<script/g)).toHaveLength(1);
  expect(html.match(/<\/script>/g)).toHaveLength(1);
  const content = html.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
  expect(JSON.parse(content)).toMatchObject({ headline });
});

it('includes posts beyond the first feed page and lists each author once in the sitemap', async () => {
  vi.mocked(getSitemapPosts).mockResolvedValue(
    Array.from({ length: 12 }, (_, index) => ({ id: `post-${index}`, author: '김 개발자' })),
  );
  const entries = await sitemap();

  expect(entries).toHaveLength(14);
  expect(new Set(entries.map((entry) => entry.url)).size).toBe(14);
  expect(entries[1].url).toBe(`${META.url}/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90`);
  expect(entries.at(-1)?.url).toBe(`${entries[1].url}/post-11`);
  expect(entries.every((entry) => entry.lastModified === undefined)).toBe(true);
});

it('does not publish an incomplete sitemap as a successful response after a database failure', async () => {
  vi.mocked(getSitemapPosts).mockRejectedValue(new Error('Database unavailable'));
  await expect(sitemap()).rejects.toThrow('Database unavailable');
});
