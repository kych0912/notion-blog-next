'use server'
import { NotionAPI } from "notion-client";

export async function getRecordMap(pageId: string) {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(pageId);
  return recordMap;
}