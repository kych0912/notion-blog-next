import { dehydrate, HydrationBoundary, type DehydratedState } from '@tanstack/react-query';

import { getLatestPosts } from '@/app/server/queries/post';
import { getQueryClient } from '@/app/utils/utils';
import { getPostOptions } from '@/app/react-query/post';

export async function prefetchLatestFeed() {
  const queryClient = getQueryClient();
  const posts = await getLatestPosts(1);
  queryClient.setQueryData(getPostOptions.getLatestPosts.queryKey, {
    pages: [{ posts }],
    pageParams: [1],
  });
  return dehydrate(queryClient);
}

async function FetchFeed({ children }: { children: React.ReactNode }) {
  return <PrefetchFeed state={await prefetchLatestFeed()}>{children}</PrefetchFeed>;
}

export default function PrefetchFeed({
  children,
  state,
}: {
  children: React.ReactNode;
  state?: DehydratedState;
}) {
  if (!state) return <FetchFeed>{children}</FetchFeed>;
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
