import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getPostOptions } from '@/app/react-query/post';

export default async function PrefetchFeed({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(getPostOptions.getLatestPosts);

  return <HydrationBoundary state={dehydrate(queryClient)}> {children} </HydrationBoundary>;
}
