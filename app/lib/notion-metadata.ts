import type { ExtendedRecordMap } from 'notion-types';
import { getBlockTitle, getBlockValue, parsePageId } from 'notion-utils';

import { getNotionImage, getPageBlockContent } from '@/app/utils/NotionApi';

export function extractNotionMetadata(
  recordMap: ExtendedRecordMap,
  id?: string,
  fallbackImage = '',
) {
  const keys = Object.keys(recordMap.block);
  const pageId = id ? parsePageId(id) : keys[0];
  const page = pageId ? getBlockValue(recordMap.block[pageId]) : undefined;
  if (!page || page.type !== 'page') throw new Error('Notion page not found');

  return {
    title: getBlockTitle(page, recordMap),
    image: getNotionImage(page.format?.page_cover || fallbackImage, page) ?? '',
    description: getPageBlockContent(recordMap, keys),
  };
}
