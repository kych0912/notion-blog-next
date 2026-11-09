import { useQuery } from '@tanstack/react-query';
import { getBlockValue } from 'notion-utils';

import { getPostDetailOptions } from '@/app/react-query/options/post';
import { getNotionImage } from '@/app/utils/NotionApi';

import { usePostContext } from '../../../../(pages)/[user]/[id]/_contexts/usePostContext';

interface PostPropertyType {
  isAuthor: boolean;
  avatar: string;
  image: string;
  publishedTime: string;
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

  const keys = Object.keys(recordMap?.block || {});
  const block = getBlockValue(recordMap.block[keys[0]]);
  const image =
    block?.type === 'page'
      ? (getNotionImage(block.format?.page_cover ?? '', block) ?? '')
      : (postDetailData.data?.image ?? '');
  const publishedTime = block
    ? new Date(block.created_time).toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
      })
    : '';

  return {
    isAuthor,
    avatar,
    image,
    publishedTime,
  };
}
