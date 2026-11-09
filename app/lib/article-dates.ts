import type { PageBlock } from 'notion-types';

export function getArticleDates(
  page: Pick<PageBlock, 'created_time' | 'last_edited_time'>,
  publishedDate?: string | null,
) {
  const publishedTime = new Date(publishedDate || page.created_time).toISOString();
  const modifiedTime = new Date(
    Math.max(page.last_edited_time, Date.parse(publishedTime)),
  ).toISOString();

  return { publishedTime, modifiedTime };
}
