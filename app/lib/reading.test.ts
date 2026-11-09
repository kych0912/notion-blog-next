import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NotionRenderer } from 'react-notion-x';
import { expect, it } from 'vitest';

import { createNotionFixture } from '@/app/test/fixtures/notion';

import { getArticleHeadings, readingProgress } from './reading';

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
