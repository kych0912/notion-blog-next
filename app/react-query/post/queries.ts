import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ExtendedRecordMap } from "notion-types";

import { getLatestPosts, getRecordMap } from "@/app/services/post/post";

export const useRecordMapFetch = (pageId: string) => {
  return useQuery<ExtendedRecordMap>({
    queryKey: ["recordMap", pageId],
    queryFn: () => getRecordMap(pageId),
    enabled: !!pageId,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useLatestPostsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["latest-posts"],
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
