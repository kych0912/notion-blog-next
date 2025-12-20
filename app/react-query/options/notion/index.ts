import { queryOptions } from '@tanstack/react-query';

import { getRecordMap } from '@/app/server/actions/notion';

export const getRecordMapOptions = (pageId: string | null) => {
  return queryOptions({
    queryKey: ['notion-recordMap', pageId],
    queryFn: () => getRecordMap(pageId),
    enabled: !!pageId,
    retry: 1,
    throwOnError: true,
  });
};
