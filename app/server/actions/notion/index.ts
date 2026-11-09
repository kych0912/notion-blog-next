'use server';
import type { ExtendedRecordMap } from 'notion-types';

import { getPage } from '@/app/lib/notion-api';
import { BaseServerResposne } from '@/app/server/actions/types';

export async function getRecordMap(
  pageId: string | null,
): Promise<BaseServerResposne<ExtendedRecordMap | null>> {
  try {
    if (!pageId) {
      return { isSuccess: true, data: null };
    }
    const recordMap = await getPage(pageId);
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
