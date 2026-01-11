import * as types from 'notion-types';
import { getBlockTitle } from 'notion-utils';

export function getNotionImage(url: string, keys: string[], block: types.Block) {
  if (!url) {
    return null;
  }

  const baseUrl = 'https://www.notion.so';
  const isImagePath = url.startsWith('/image');
  const encodedUrl = encodeURIComponent(url);

  if (url.startsWith('/')) {
    url = `${baseUrl}${isImagePath ? url : `/image/${encodedUrl}`}`;
    return url;
  } else {
    url = `${baseUrl}${isImagePath ? url : `/image/${encodedUrl}`}`;
  }

  // URL 객체 생성 및 검색 매개변수 설정
  const notionImageUrl = new URL(url);
  let table = block.parent_table === 'space' ? 'block' : block.parent_table;

  if (table === 'collection' || table === 'team') {
    table = 'block';
  }

  notionImageUrl.searchParams.set('table', table);
  notionImageUrl.searchParams.set('id', keys[0]);
  notionImageUrl.searchParams.set('cache', 'v2');

  return notionImageUrl.toString();
}

export function getPageBlockContent(recordMap: types.ExtendedRecordMap, keys: string[]) {
  const description: string[] = [];

  for (let i = 0; i < keys.length; i++) {
    const blockValue = recordMap?.block?.[keys[i]]?.value;

    if (!blockValue) continue;
    // 타입 page
    if (blockValue.type !== 'text') continue;

    const blockTitle = getBlockTitle(blockValue, recordMap);

    if (description.join('').length > 150) break;

    description.push(blockTitle);
  }
  return description.join(' ');
}
