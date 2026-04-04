import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getLatestPosts } from '@/app/server/queries/post';

export default async function PrefetchFeed({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const posts = await getLatestPosts(1);
  queryClient.setQueryData(['latest-posts'], {
    pages: [{ posts }],
    pageParams: [1],
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
