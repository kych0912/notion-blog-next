import { infiniteQueryOptions } from '@tanstack/react-query';

import { getLatestPostsAction } from '@/app/server/actions/post';

export const getPostOptions = {
  getLatestPosts: infiniteQueryOptions({
    queryKey: ['latest-posts'],
    // suspenseQuery랑 서버액션 같이 X
    // 서버액션이 완료되면 nextjs router가 refetch,
    // 하지만 Latest는 아직 마운트중
    // 즉 Latest가 마운트중인데 nextjs router가 refetch하면서 에러가 발생
    queryFn: ({ pageParam = 1 }) => getLatestPostsAction(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.posts.length < 10) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
  }),
};
