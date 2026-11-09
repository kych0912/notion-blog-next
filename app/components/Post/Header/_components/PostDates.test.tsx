import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';

import { getArticleDates } from '@/app/lib/article-dates';

import PostDates from './PostDates';

it('displays the actual publication date and later Notion edit as machine-readable dates', () => {
  const dates = getArticleDates({
    created_time: Date.parse('2024-01-01T00:00:00Z'),
    last_edited_time: Date.parse('2024-02-03T16:00:00Z'),
  }, '2024-02-01T00:00:00Z');
  const html = renderToStaticMarkup(<PostDates {...dates} />);

  expect(dates).toEqual({
    publishedTime: '2024-02-01T00:00:00.000Z',
    modifiedTime: '2024-02-03T16:00:00.000Z',
  });
  expect(html).toContain('dateTime="2024-02-01T00:00:00.000Z"');
  expect(html).toContain('dateTime="2024-02-03T16:00:00.000Z"');
  expect(html).toContain('2024. 2. 4.');
  expect(html).toContain('발행');
  expect(html).toContain('수정');
});

it('does not report an edit before the article was published', () => {
  const dates = getArticleDates({ created_time: 1700000000000, last_edited_time: 1700000000000 },
    '2024-01-01T00:00:00Z');

  expect(dates.modifiedTime).toBe(dates.publishedTime);
  expect(renderToStaticMarkup(<PostDates {...dates} />)).not.toContain('수정');
});

it('uses Notion dates for child pages without a stored publication date', () => {
  expect(getArticleDates({ created_time: 1700000000000, last_edited_time: 1700000000000 })).toEqual({
    publishedTime: '2023-11-14T22:13:20.000Z',
    modifiedTime: '2023-11-14T22:13:20.000Z',
  });
});
