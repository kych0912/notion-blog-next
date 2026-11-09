import { beforeEach, expect, it, vi } from 'vitest';

import { syncPostAction } from './sync';

const { auth, getPage, getPostById, syncPostMetadata, revalidatePath } = vi.hoisted(() => ({
  auth: vi.fn(),
  getPage: vi.fn(),
  getPostById: vi.fn(),
  syncPostMetadata: vi.fn(),
  revalidatePath: vi.fn(),
}));
vi.mock('@/auth', () => ({ auth }));
vi.mock('@/app/lib/notion-api', () => ({ getPage }));
vi.mock('@/app/server/queries/post', () => ({ getPostById }));
vi.mock('@/app/server/services/post-sync', () => ({ syncPostMetadata }));
vi.mock('next/cache', () => ({ revalidatePath }));

beforeEach(() => {
  vi.resetAllMocks();
  auth.mockResolvedValue({ user: { id: 'owner' } });
  getPostById.mockResolvedValue([{ id: 'page', authorId: 'owner', author: 'writer' }]);
  getPage.mockResolvedValue({ block: {} });
  syncPostMetadata.mockResolvedValue({ changed: true });
});

it('requires a signed-in author before requesting Notion or changing data', async () => {
  auth.mockResolvedValue(null);
  expect((await syncPostAction('page')).ok).toBe(false);
  expect(getPage).not.toHaveBeenCalled();
  expect(syncPostMetadata).not.toHaveBeenCalled();
});

it('rejects another author', async () => {
  auth.mockResolvedValue({ user: { id: 'someone-else' } });
  expect((await syncPostAction('page')).ok).toBe(false);
  expect(getPage).not.toHaveBeenCalled();
});

it('syncs an owned post and refreshes its public listings', async () => {
  expect((await syncPostAction('page')).ok).toBe(true);
  expect(syncPostMetadata).toHaveBeenCalled();
  expect(revalidatePath).toHaveBeenCalledWith('/');
  expect(revalidatePath).toHaveBeenCalledWith('/search');
});

it('keeps the published metadata when Notion is unavailable', async () => {
  getPage.mockRejectedValue(new Error('Unavailable'));
  expect((await syncPostAction('page')).ok).toBe(false);
  expect(syncPostMetadata).not.toHaveBeenCalled();
});
