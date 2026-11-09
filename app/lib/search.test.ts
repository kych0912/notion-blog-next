import { expect, it } from 'vitest';

import { searchExcerpt } from './search';

it('keeps the matching context when it occurs beyond the initial excerpt', () => {
  const caption = `${'다른 설명 '.repeat(50)}claude 사용법과 예제`;
  const excerpt = searchExcerpt(caption, 'CLAUDE', 90);
  expect(excerpt).toContain('claude');
  expect(excerpt).toContain('사용법');
  expect(excerpt).toMatch(/^…/);
  expect(excerpt.length).toBeLessThanOrEqual(92);
});

it('keeps a long search phrase intact', () => {
  const query = '검색 문장 '.repeat(20).trim();
  expect(searchExcerpt(`앞부분 ${query} 뒷부분`, query, 90)).toContain(query);
});

it('preserves the normal leading excerpt when there is no match', () => {
  expect(searchExcerpt('짧은 설명', '없는 단어')).toBe('짧은 설명');
  expect(searchExcerpt('설명 '.repeat(100), '', 90)).toMatch(/…$/);
});
