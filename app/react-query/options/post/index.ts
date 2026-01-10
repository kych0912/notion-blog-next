import { queryOptions } from '@tanstack/react-query';

import { getPostDetailAction } from '@/app/server/actions/post';

export const getPostDetailOptions = (id: string, user: string) => {
  return queryOptions({
    queryKey: ['post-detail', user, id],
    queryFn: async () => {
      return getPostDetailAction(id, user);
    },
    retry: false,
    throwOnError: true,
  });
};
