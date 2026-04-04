import { useQuery } from '@tanstack/react-query';

import { getPostDetailOptions } from '@/app/react-query/options/post';

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
  const image = postDetailData.data?.image ?? '';

  const keys = Object.keys(recordMap?.block || {});
  const rawValue = recordMap?.block?.[keys[0]]?.value;
  const createdTime =
    rawValue && 'created_time' in rawValue
      ? (rawValue as unknown as { created_time: string }).created_time
      : '';

  const publishedTime = new Date(createdTime).toLocaleDateString();

  return {
    isAuthor,
    avatar,
    image,
    publishedTime,
  };
}
