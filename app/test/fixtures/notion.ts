import type { Block, ExtendedRecordMap, PageBlock } from 'notion-types';

export const fixturePageId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

export function createNotionFixture({
  id = fixturePageId,
  title = '새로운 글 제목',
  description = '수정한 본문 설명입니다.',
  image = 'https://images.unsplash.com/photo-fixture',
  nested = true,
} = {}): ExtendedRecordMap {
  const textId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  const headingId = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
  const page: PageBlock = {
    id,
    type: 'page',
    properties: { title: [[title]] },
    format: { page_cover: image },
    permissions: [{ role: 'reader', type: 'public_permission' }],
    content: [headingId, textId],
    parent_id: 'space',
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
    properties: { title: [[description]] },
    content: undefined,
    format: undefined,
    parent_id: id,
    parent_table: 'block',
  };
  const heading: Block = {
    ...text,
    id: headingId,
    type: 'header',
    properties: { title: [['첫 번째 제목']] },
  };
  const block: ExtendedRecordMap['block'] = {};
  for (const value of [page, heading, text]) {
    const entry = { role: 'reader' as const, value };
    block[value.id] = nested ? { role: 'reader', value: entry } : entry;
  }
  return {
    block,
    collection: {},
    collection_view: {},
    notion_user: {},
    collection_query: {},
    signed_urls: {},
  };
}
