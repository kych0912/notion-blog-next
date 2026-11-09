import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it, vi } from 'vitest';

import { getUserInfoAndPostByName } from '@/app/server/queries/user';
import { getUserPosts } from '@/app/server/queries/post';

import Page, { generateMetadata } from './page';

vi.mock('@/app/server/queries/user', () => ({ getUserInfoAndPostByName: vi.fn() }));
vi.mock('@/app/server/queries/post', () => ({ getUserPosts: vi.fn() }));
vi.mock('@/app/react-query/options/category', () => ({
  getUserPostCategoriesOptions: () => ({ queryKey: ['categories'], queryFn: () => Promise.resolve([]) }),
}));
vi.mock('./_components/ProfileActions', () => ({ default: () => null }));
vi.mock('./_components/Category/Category', () => ({ default: () => null }));

it('identifies the visible author consistently without exposing private profile fields', async () => {
  vi.mocked(getUserInfoAndPostByName).mockResolvedValue({
    id: 'author-id',
    name: '김 개발자',
    avatar: null,
    email: 'private@example.com',
    password: 'private-value',
  });
  vi.mocked(getUserPosts).mockResolvedValue([]);
  const params = Promise.resolve({ user: encodeURIComponent('김 개발자') });
  const metadata = await generateMetadata({ params });
  const html = renderToStaticMarkup(
    <QueryClientProvider client={new QueryClient()}>{await Page({ params })}</QueryClientProvider>,
  );
  const content = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
  if (!content) throw new Error('Missing profile structured data');
  const url = 'https://www.nextblog.me/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90';

  expect(metadata.alternates?.canonical).toBe(url);
  expect(JSON.parse(content)).toMatchObject({
    '@type': 'ProfilePage',
    url,
    mainEntity: { '@type': 'Person', '@id': `${url}#person`, name: '김 개발자', url },
  });
  expect(html).toContain('<h1>김 개발자</h1>');
  expect(html).not.toContain('private@example.com');
  expect(html).not.toContain('private-value');
});
