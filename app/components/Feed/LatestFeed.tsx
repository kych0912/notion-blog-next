import { Suspense } from 'react';
import type { DehydratedState } from '@tanstack/react-query';

import FeedLayout from './_components/FeedLayout';
import FeedItem from './_components/FeedItem';
import Latest from './_components/Latest';
import PrefetchFeed from './_components/PrefetchFeed';

export default function LatestFeed({ initialState }: { initialState?: DehydratedState }) {
  if (initialState) {
    return (
      <FeedLayout>
        <PrefetchFeed state={initialState}>
          <Latest />
        </PrefetchFeed>
      </FeedLayout>
    );
  }

  return (
    <FeedLayout>
      <Suspense
        fallback={
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <FeedItem
                key={`skeleton-${index}`}
                isLoading
                variant={index === 0 ? 'featured' : 'row'}
              />
            ))}
          </>
        }
      >
        <PrefetchFeed state={initialState}>
          <Latest />
        </PrefetchFeed>
      </Suspense>
    </FeedLayout>
  );
}
