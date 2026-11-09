import type { Block, ExtendedRecordMap, NotionMapBox, PageBlock } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getRecordMap } from '@/app/server/actions/notion';
import { getPageBlockContent } from '@/app/utils/NotionApi';

import { getNotionPageContent, getPage } from './notion-api';

const { fetchMock } = vi.hoisted(() => {
  const fetchMock = vi.fn<typeof fetch>();
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock };
});

vi.mock('../server/queries/post', () => ({ getPostById: vi.fn() }));

const pageId = '067dd719-a912-471e-a9a3-ac10710e7fdf';
const textId = '10000000-0000-4000-8000-000000000001';
const page: PageBlock = {
  id: pageId,
  type: 'page',
  properties: { title: [['노션 블로그 글']] },
  format: { page_cover: '/images/page-cover/woodcuts_1.jpg' },
  permissions: [{ role: 'reader', type: 'public_permission' }],
  content: [textId],
  parent_id: '10000000-0000-4000-8000-000000000002',
  parent_table: 'space',
  version: 1,
  created_time: 1700000000000,
  last_edited_time: 1700000000000,
  alive: true,
  created_by_table: 'notion_user',
  created_by_id: 'author',
  last_edited_by_table: 'notion_user',
  last_edited_by_id: 'author',
};

const text: Block = {
  ...page,
  id: textId,
  type: 'text',
  properties: { title: [['블로그 본문이 정상적으로 표시됩니다.']] },
  format: undefined,
  content: undefined,
  parent_id: pageId,
  parent_table: 'block',
};

function wrapBlock(value: Block, nested: boolean): NotionMapBox<Block> {
  const entry = { role: 'reader' as const, value };
  return nested ? { role: 'reader', value: entry } : entry;
}

function mockPageResponse(nested: boolean) {
  const recordMap: ExtendedRecordMap = {
    block: {
      [pageId]: wrapBlock(page, nested),
      [textId]: wrapBlock(text, nested),
    },
    collection: {},
    collection_view: {},
    notion_user: {},
    collection_query: {},
    signed_urls: {},
  };

  fetchMock.mockImplementation((input) => {
    const url = new URL(input instanceof Request ? input.url : String(input));

    if (url.origin !== 'https://app.notion.com') {
      return Promise.resolve(new Response('Forbidden', { status: 403 }));
    }

    return Promise.resolve(Response.json({ recordMap: structuredClone(recordMap) }));
  });
}

beforeEach(() => {
  fetchMock.mockReset();
});

describe.each([false, true])('Notion page loading (nested values: %s)', (nested) => {
  it('loads blog content through the current Notion API', async () => {
    mockPageResponse(nested);

    const recordMap = await getPage(pageId);

    expect(getPageTitle(recordMap)).toBe('노션 블로그 글');
    expect(getPageBlockContent(recordMap, Object.keys(recordMap.block))).toBe(
      '블로그 본문이 정상적으로 표시됩니다.',
    );
  });

  it('loads the same content for the editor preview', async () => {
    mockPageResponse(nested);

    const result = await getRecordMap(pageId);

    expect(result.isSuccess).toBe(true);
    if (!result.isSuccess || !result.data) throw new Error('Missing preview record map');
    expect(getPageTitle(result.data)).toBe('노션 블로그 글');
  });

  it('extracts the post title and cover image', async () => {
    mockPageResponse(nested);

    await expect(getNotionPageContent(pageId)).resolves.toEqual({
      title: '노션 블로그 글',
      image: 'https://app.notion.com/images/page-cover/woodcuts_1.jpg',
    });
  });

  it('renders the fetched article body as HTML', async () => {
    mockPageResponse(nested);
    const recordMap = await getPage(pageId);
    const { createElement } = await import('react');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { NotionRenderer } = await import('react-notion-x');

    const html = renderToStaticMarkup(createElement(NotionRenderer, { recordMap }));

    expect(html).toContain('블로그 본문이 정상적으로 표시됩니다.');
    expect(html).toContain('notion-text');
  });
});

it('returns an empty preview when no page is selected', async () => {
  await expect(getRecordMap(null)).resolves.toEqual({ isSuccess: true, data: null });
  expect(fetchMock).not.toHaveBeenCalled();
});

it('reports an error when the Notion page cannot be loaded', async () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  fetchMock.mockResolvedValue(new Response('Forbidden', { status: 403 }));

  try {
    await expect(getRecordMap(pageId)).resolves.toMatchObject({
      isSuccess: false,
      error: { error: 'NOTION_GET_RECORDMAP_ERROR' },
    });
  } finally {
    consoleError.mockRestore();
  }
});
