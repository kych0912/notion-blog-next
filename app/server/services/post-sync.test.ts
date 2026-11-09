import { beforeEach, expect, it, vi } from 'vitest';

import type { PostType } from '@/app/server/db/schema';
import { createNotionFixture, fixturePageId } from '@/app/test/fixtures/notion';

import { syncPostMetadata } from './post-sync';

const { updatePostMetadata } = vi.hoisted(() => ({ updatePostMetadata: vi.fn() }));
vi.mock('@/app/server/queries/post', () => ({ updatePostMetadata }));

const post: PostType = {
  id: fixturePageId,
  author: 'author',
  authorId: 'owner',
  date: '2024-01-01T00:00:00.000Z',
  title: '이전 제목',
  description: '이전 본문',
  image: '',
  avatar: '',
  category: 'category',
};

beforeEach(() => {
  vi.clearAllMocks();
  updatePostMetadata.mockImplementation((id: string, authorId: string, metadata: object) =>
    Promise.resolve({ ...post, id, authorId, ...metadata }),
  );
});

it.each([false, true])('syncs changed Notion metadata (nested values: %s)', async (nested) => {
  const result = await syncPostMetadata(post, createNotionFixture({ nested }));

  expect(result.changed).toBe(true);
  expect(updatePostMetadata).toHaveBeenCalledWith(fixturePageId, 'owner', {
    title: '새로운 글 제목',
    description: '수정한 본문 설명입니다.',
    image: 'https://images.unsplash.com/photo-fixture',
  });
  expect(result.post).toMatchObject({ date: post.date, authorId: 'owner', category: 'category' });
});

it('does not write unchanged metadata', async () => {
  const recordMap = createNotionFixture({
    title: post.title!,
    description: post.description!,
    image: '',
  });
  await expect(syncPostMetadata(post, recordMap)).resolves.toEqual({ changed: false, post });
  expect(updatePostMetadata).not.toHaveBeenCalled();
});

it('does not erase a published post when its Notion page is missing', async () => {
  const recordMap = createNotionFixture();
  recordMap.block = {};
  await expect(syncPostMetadata(post, recordMap)).rejects.toThrow('Notion page not found');
  expect(updatePostMetadata).not.toHaveBeenCalled();
});
