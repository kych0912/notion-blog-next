import type * as types from 'notion-types';
import { defaultMapImageUrl, getBlockTitle, getBlockValue } from 'notion-utils';

export function getNotionImage(url: string, block: types.Block) {
  return url ? defaultMapImageUrl(url, block) : null;
}

export function normalizeNotionImageUrl(url: string) {
  return url.replace(
    /^https:\/\/(?:www\.)?notion\.so\/(images?)\//,
    'https://app.notion.com/$1/',
  );
}

export function getPageBlockContent(recordMap: types.ExtendedRecordMap, keys: string[]) {
  const description: string[] = [];

  for (let i = 0; i < keys.length; i++) {
    const blockValue = getBlockValue(recordMap.block[keys[i]]);

    if (!blockValue) continue;
    // 타입 page
    if (blockValue.type !== 'text') continue;

    const blockTitle = getBlockTitle(blockValue, recordMap);

    if (description.join('').length > 150) break;

    description.push(blockTitle);
  }
  return description.join(' ');
}
