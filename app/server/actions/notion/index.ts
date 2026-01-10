'use server';
import { NotionAPI } from 'notion-client';

import { BaseServerResposne } from '@/app/server/actions/types';

export async function getRecordMap(
  pageId: string | null,
): Promise<BaseServerResposne<Awaited<ReturnType<NotionAPI['getPage']>> | null>> {
  try {
    if (!pageId) {
      return { isSuccess: true, data: null };
    }
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId);
    return { isSuccess: true, data: recordMap };
  } catch {
    return {
      isSuccess: false,
      error: {
        error: 'NOTION_GET_RECORDMAP_ERROR',
        message: 'Notion 페이지를 불러오지 못했습니다.',
      },
    };
  }
}
