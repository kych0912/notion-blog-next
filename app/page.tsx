import WithHeader from '@/app/components/Layout/WithHeaderLayout';
import { HomePageLayout } from '@/app/components/Layout/HomeLayout';
import FallbackErrorBoundary from '@/app/components/Error/FallbackErrorBoundary';

import HomeTab from './components/HomeTab';
import LatestFeed from './components/Feed/LatestFeed';
import GlobalErrorBoundary from './components/Error/GlobalErrorBoundary';
import { prefetchLatestFeed } from './components/Feed/_components/PrefetchFeed';

export default async function Home() {
  // Successful reads render in the initial HTML; failures retain the feed's existing retry boundary.
  const initialState = await prefetchLatestFeed().catch(() => undefined);
  return (
    <GlobalErrorBoundary>
      <WithHeader>
        <HomePageLayout>
          <HomeTab />
          <FallbackErrorBoundary>
            <LatestFeed initialState={initialState} />
          </FallbackErrorBoundary>
        </HomePageLayout>
      </WithHeader>
    </GlobalErrorBoundary>
  );
}
