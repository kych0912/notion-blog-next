import { useInfiniteQuery } from '@tanstack/react-query';

import { getLatestPosts } from '@/app/services/post/post';

export const useLatestPostsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['latest-posts'],
    queryFn: ({ pageParam = 1 }) => getLatestPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
  });
};
