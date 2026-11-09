import type { ExtendedRecordMap } from 'notion-types';
import { getBlockValue, getPageTableOfContents, uuidToId } from 'notion-utils';

export interface ArticleHeading {
  id: string;
  title: string;
  level: number;
}

export function getArticleHeadings(recordMap: ExtendedRecordMap): ArticleHeading[] {
  const page = getBlockValue(recordMap.block[Object.keys(recordMap.block)[0]]);
  if (!page || page.type !== 'page') return [];
  return getPageTableOfContents(page, recordMap)
    .filter((entry) => entry.text.trim())
    .map((entry) => ({ id: uuidToId(entry.id), title: entry.text, level: entry.indentLevel }));
}

export function readingProgress(top: number, height: number, viewport: number, offset = 80) {
  const distance = height - viewport + offset;
  if (distance <= 0) return top + height <= viewport ? 100 : 0;
  return Math.min(100, Math.max(0, ((offset - top) / distance) * 100));
}
