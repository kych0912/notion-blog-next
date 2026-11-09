import { getBlockValue } from 'notion-utils';
import { renderToReadableStream, renderToStaticMarkup } from 'react-dom/server';
import { expect, it, vi } from 'vitest';

import { createNotionFixture, fixturePageId } from '@/app/test/fixtures/notion';

import NotionPageRenderer from './NotionPageRenderer';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock('@/app/context/ThemeContext', () => ({ useTheme: () => ({ theme: 'light' }) }));
// Match Next's App Router alias; the Node default uses the Pages Router loader.
vi.mock('next/dynamic', async () => {
  const { default: dynamic } = await import('next/dist/shared/lib/app-dynamic');
  return { default: dynamic };
});

it('includes code samples and equations in the server HTML without executing browser JavaScript', async () => {
  const recordMap = createNotionFixture();
  const parent = getBlockValue(recordMap.block[fixturePageId]);
  if (!parent || parent.type !== 'page') throw new Error('Missing fixture page');
  const codeId = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
  const equationId = 'ffffffff-ffff-4fff-8fff-ffffffffffff';
  parent.content = [codeId, equationId];
  recordMap.block[codeId] = {
    role: 'reader',
    value: {
      ...parent,
      id: codeId,
      type: 'code',
      parent_id: fixturePageId,
      parent_table: 'block',
      properties: { title: [['const answer = 42;']], language: [['JavaScript']], caption: [] },
      content: undefined,
      format: undefined,
    },
  };
  recordMap.block[equationId] = {
    role: 'reader',
    value: {
      ...parent,
      id: equationId,
      type: 'equation',
      parent_id: fixturePageId,
      parent_table: 'block',
      properties: { title: [['E = mc^2']] },
      content: undefined,
      format: undefined,
    },
  };

  const stream = await renderToReadableStream(
    <NotionPageRenderer recordMap={recordMap} user="작성자" />,
  );
  await stream.allReady;
  const html = await new Response(stream).text();

  expect(html).toMatch(/<code[^>]*>const answer = 42;<\/code>/);
  expect(html).toContain('<math');
  expect(html).toContain('<annotation encoding="application/x-tex">E = mc^2</annotation>');
  expect(html).not.toContain('BAILOUT_TO_CLIENT_SIDE_RENDERING');
});

it.each([false, true])('renders child pages as crawlable links (preview: %s)', (isPreview) => {
  const recordMap = createNotionFixture();
  const parent = getBlockValue(recordMap.block[fixturePageId]);
  if (!parent || parent.type !== 'page') throw new Error('Missing fixture page');
  const childId = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
  parent.content = [childId];
  recordMap.block[childId] = {
    role: 'reader',
    value: {
      ...parent,
      id: childId,
      parent_id: fixturePageId,
      parent_table: 'block',
      properties: { title: [['하위 페이지']] },
      content: [],
    },
  };

  const html = renderToStaticMarkup(
    <NotionPageRenderer recordMap={recordMap} user="김 개발자" isPreview={isPreview} />,
  );
  const href = isPreview
    ? `/write?pageId=${childId}`
    : `/%EA%B9%80%20%EA%B0%9C%EB%B0%9C%EC%9E%90/${childId}`;

  expect(html).toMatch(new RegExp(`<a[^>]+href="${href.replace('?', '\\?')}"`));
  expect(html).toContain('하위 페이지');
});
