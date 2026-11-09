import { getBlockValue } from 'notion-utils';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it, vi } from 'vitest';

import { createNotionFixture, fixturePageId } from '@/app/test/fixtures/notion';

import NotionPageRenderer from './NotionPageRenderer';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock('@/app/context/ThemeContext', () => ({ useTheme: () => ({ theme: 'light' }) }));

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
