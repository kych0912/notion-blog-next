import { Suspense } from 'react';

import FeedLayout from './_components/FeedLayout';
import FeedItem from './_components/FeedItem';
import Latest from './_components/Latest';
import PrefetchFeed from './_components/PrefetchFeed';

export default function LatestFeed() {
  return (
    <FeedLayout>
      <Suspense
        fallback={
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <FeedItem key={`skeleton-${index}`} isLoading={true} />
            ))}
          </>
        }
      >
        <PrefetchFeed>
          <Latest />
        </PrefetchFeed>
      </Suspense>
    </FeedLayout>
  );
}
