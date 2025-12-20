'use server';
import { NotionAPI } from 'notion-client';

export async function getRecordMap(pageId: string | null) {
  if (!pageId) {
    return null;
  }
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(pageId);
  return recordMap;
}
