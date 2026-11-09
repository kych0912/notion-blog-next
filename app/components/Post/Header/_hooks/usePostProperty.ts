import { useQuery } from '@tanstack/react-query';
import { getBlockValue, parsePageId } from 'notion-utils';

import { getPostDetailOptions } from '@/app/react-query/options/post';
import { getNotionImage } from '@/app/utils/NotionApi';
import { getArticleDates } from '@/app/lib/article-dates';

import { usePostContext } from '../../../../(pages)/[user]/[id]/_contexts/usePostContext';

interface PostPropertyType {
  isAuthor: boolean;
  avatar: string;
  image: string;
  publishedTime: string;
  modifiedTime: string;
}

export function usePostProperty(): PostPropertyType | null {
  const { id, user, recordMap } = usePostContext();
  const { data: postDetail } = useQuery(getPostDetailOptions(id, user));

  if (!postDetail?.isSuccess) {
    return null;
  }

  const postDetailData = postDetail.data;

  const isAuthor = postDetailData.isAuthor;
  const avatar = postDetailData.data?.avatar ?? '';

  const pageId = parsePageId(id);
  const block = pageId ? getBlockValue(recordMap.block[pageId]) : undefined;
  const image =
    block?.type === 'page'
      ? (getNotionImage(block.format?.page_cover ?? '', block) ?? '')
      : (postDetailData.data?.image ?? '');
  const dates = block?.type === 'page' ? getArticleDates(block, postDetailData.data?.date) : null;

  return {
    isAuthor,
    avatar,
    image,
    publishedTime: dates?.publishedTime ?? '',
    modifiedTime: dates?.modifiedTime ?? '',
  };
}
