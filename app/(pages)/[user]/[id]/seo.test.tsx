import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getBlockValue } from 'notion-utils';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, expect, it, vi } from 'vitest';

import { getPage } from '@/app/lib/notion-api';
import { getPostDetailAction } from '@/app/server/actions/post';
import { createNotionFixture, fixturePageId } from '@/app/test/fixtures/notion';

import Page, { generateMetadata } from './page';

vi.mock('@/app/lib/notion-api', () => ({ getPage: vi.fn() }));
vi.mock('@/app/server/actions/post', () => ({ getPostDetailAction: vi.fn() }));
vi.mock('@/app/server/services/post-sync', () => ({ syncPostMetadata: vi.fn() }));
vi.mock('next/server', () => ({ after: vi.fn() }));
vi.mock('@/app/react-query/options/category', () => ({
  getPostCategoryOptions: () => ({ queryKey: ['category'], queryFn: () => Promise.resolve([]) }),
}));
vi.mock('@/app/components/Post/Header/PostHeaderFactory', () => ({ default: () => null }));
vi.mock('@/app/components/Renderer/NotionPageRenderer', () => ({ default: () => null }));
vi.mock('@/app/components/Post/RelatedPosts', () => ({ default: () => null }));

const params = Promise.resolve({ id: fixturePageId, user: '김 개발자' });

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getPage).mockResolvedValue(createNotionFixture());
  vi.mocked(getPostDetailAction).mockResolvedValue({
    isSuccess: true,
    data: {
      id: fixturePageId,
      isAuthor: false,
      isChild: false,
      data: {
        id: fixturePageId,
        author: '김 개발자',
        authorId: 'author-id',
        date: '2023-01-01T00:00:00.000Z',
        title: '이전 제목',
        description: '이전 설명',
        image: null,
        avatar: null,
        category: null,
      },
    },
  });
});

it('uses the requested Notion page and the complete rich-text title for article metadata', async () => {
  const recordMap = createNotionFixture();
  const page = getBlockValue(recordMap.block[fixturePageId]);
  if (!page) throw new Error('Missing fixture page');
  page.properties = { title: [['검색 ', [['b']]], ['최적화 가이드']] };
  recordMap.block = Object.fromEntries(Object.entries(recordMap.block).reverse());
  vi.mocked(getPage).mockResolvedValue(recordMap);

  const metadata = await generateMetadata({ params });

  expect(metadata.title).toBe('검색 최적화 가이드 - NextBlog');
  expect(metadata.description).toBe('수정한 본문 설명입니다.');
  expect(metadata.alternates?.canonical).toBe(
    `https://www.nextblog.me/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90/${fixturePageId}`,
  );
  expect(metadata.openGraph).toMatchObject({
    type: 'article',
    publishedTime: '2023-01-01T00:00:00.000Z',
    modifiedTime: '2023-11-14T22:13:20.000Z',
    images: [{ url: 'https://images.unsplash.com/photo-fixture' }],
  });
});

it('renders article structured data with the same canonical, author, and content as metadata', async () => {
  const metadata = await generateMetadata({ params });
  const html = renderToStaticMarkup(
    <QueryClientProvider client={new QueryClient()}>{await Page({ params })}</QueryClientProvider>,
  );
  const content = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
  if (!content) throw new Error('Missing article structured data');

  expect(JSON.parse(content)).toMatchObject({
    '@type': 'BlogPosting',
    headline: '새로운 글 제목',
    description: metadata.description,
    url: metadata.alternates?.canonical,
    author: {
      '@type': 'Person',
      '@id': 'https://www.nextblog.me/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90#person',
      name: '김 개발자',
      url: 'https://www.nextblog.me/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90',
    },
    datePublished: '2023-01-01T00:00:00.000Z',
  });
});

it('decodes encoded route parameters once before generating canonical URLs and author names', async () => {
  const encodedParams = Promise.resolve({ id: fixturePageId, user: encodeURIComponent('김 개발자') });
  const metadata = await generateMetadata({ params: encodedParams });

  expect(metadata.alternates?.canonical).toBe(
    `https://www.nextblog.me/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90/${fixturePageId}`,
  );
  expect(metadata.authors).toEqual([{
    name: '김 개발자',
    url: 'https://www.nextblog.me/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90',
  }]);
});

it('returns not-found instead of indexable metadata for an unregistered page', async () => {
  vi.mocked(getPostDetailAction).mockRejectedValue(new Error('NOT_FOUND'));
  await expect(generateMetadata({ params })).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
});

it('keeps transient Notion failures distinct from missing pages', async () => {
  vi.mocked(getPage).mockRejectedValue(new Error('Notion temporarily unavailable'));
  await expect(generateMetadata({ params })).rejects.toThrow('Notion temporarily unavailable');
});
