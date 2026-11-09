import { expect, it } from 'vitest';

import { buildRss, escapeXml } from './rss';

it('escapes user-authored text and strips invalid XML characters', () => {
  const xml = buildRss([
    {
      id: 'post/id',
      author: '한 글',
      title: '<script>A & B</script>\u0000',
      description: '문장 "]]>" & 설명',
      date: '2025-01-02T03:04:05Z',
      categoryName: 'React & Next',
    },
  ]);
  expect(xml).not.toContain('<script>');
  expect(xml).not.toContain('\u0000');
  expect(xml).toContain('&lt;script&gt;A &amp; B&lt;/script&gt;');
  expect(xml).toContain('/%ED%95%9C%20%EA%B8%80/post%2Fid');
  expect(xml).toContain('<category>React &amp; Next</category>');
  expect(xml).toContain('<pubDate>Thu, 02 Jan 2025 03:04:05 GMT</pubDate>');
  expect(escapeXml('\ud800')).toBe('�');
});

it('returns a valid empty feed before the first post is published', () => {
  const xml = buildRss([]);
  expect(xml).toContain('<channel>');
  expect(xml).toContain('rel="self"');
  expect(xml).not.toContain('<item>');
  expect(xml).not.toContain('Invalid Date');
});
