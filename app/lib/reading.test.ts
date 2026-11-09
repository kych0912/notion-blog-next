import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NotionRenderer } from 'react-notion-x';
import { expect, it } from 'vitest';

import { createNotionFixture } from '@/app/test/fixtures/notion';

import {
  getArticleHeadings,
  groupArticleHeadings,
  readingProgress,
  updateActiveHeading,
} from './reading';

it('builds table-of-contents links that target actual rendered Notion anchors', () => {
  const recordMap = createNotionFixture();
  const headings = getArticleHeadings(recordMap);
  const html = renderToStaticMarkup(createElement(NotionRenderer, { recordMap }));
  expect(headings).toHaveLength(1);
  expect(headings[0].title).toBe('첫 번째 제목');
  expect(html).toContain(`id="${headings[0].id}"`);
});

it('handles an unavailable article without a table of contents', () => {
  expect(getArticleHeadings({ ...createNotionFixture(), block: {} })).toEqual([]);
});

it('tracks only the article body and clamps progress at either end', () => {
  expect(readingProgress(500, 3000, 800)).toBe(0);
  expect(readingProgress(80, 3000, 800)).toBe(0);
  expect(readingProgress(-1060, 3000, 800)).toBe(50);
  expect(readingProgress(-2200, 3000, 800)).toBe(100);
  expect(readingProgress(-5000, 3000, 800)).toBe(100);
  expect(readingProgress(100, 400, 800)).toBe(100);
});

it('groups nested sections under their nearest top-level heading', () => {
  const headings = [
    { id: 'intro', title: '시작', level: 0 },
    { id: 'setup', title: '설정', level: 1 },
    { id: 'detail', title: '세부 설정', level: 2 },
    { id: 'next', title: '다음', level: 0 },
  ];
  expect(groupArticleHeadings(headings)).toEqual([
    { heading: headings[0], children: [headings[1], headings[2]] },
    { heading: headings[3], children: [] },
  ]);
});

it('retains every section when an article starts at a deeper heading level', () => {
  const headings = [
    { id: 'a', title: 'A', level: 1 },
    { id: 'b', title: 'B', level: 2 },
  ];
  expect(groupArticleHeadings(headings)).toEqual([
    { heading: headings[0], children: [headings[1]] },
  ]);
  expect(groupArticleHeadings([])).toEqual([]);
});

it('does not revive a stale manual expansion after reading another section and returning', () => {
  const groups = groupArticleHeadings([
    { id: 'a', title: 'A', level: 0 },
    { id: 'b', title: 'B', level: 0 },
    { id: 'b-child', title: 'B child', level: 1 },
  ]);
  const afterReadingB = updateActiveHeading(
    { activeId: 'a', expandedGroupId: 'b' },
    'b-child',
    groups,
  );
  expect(afterReadingB).toEqual({ activeId: 'b-child', expandedGroupId: undefined });
  expect(updateActiveHeading(afterReadingB, 'a', groups).expandedGroupId).toBeUndefined();
});

it('respects a manual collapse while reading within the same section', () => {
  const groups = groupArticleHeadings([
    { id: 'a', title: 'A', level: 0 },
    { id: 'child', title: 'Child', level: 1 },
  ]);
  expect(updateActiveHeading({ activeId: 'a', expandedGroupId: null }, 'child', groups)).toEqual({
    activeId: 'child',
    expandedGroupId: null,
  });
});
