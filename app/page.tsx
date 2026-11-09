import WithHeader from '@/app/components/Layout/WithHeaderLayout';
import { HomePageLayout } from '@/app/components/Layout/HomeLayout';
import FallbackErrorBoundary from '@/app/components/Error/FallbackErrorBoundary';
import { getMetadata } from '@/app/components/MetaData/getMetaData';
import JsonLd from '@/app/components/MetaData/JsonLd';
import { META } from '@/app/constants/metadata';

import HomeTab from './components/HomeTab';
import LatestFeed from './components/Feed/LatestFeed';
import GlobalErrorBoundary from './components/Error/GlobalErrorBoundary';
import { prefetchLatestFeed } from './components/Feed/_components/PrefetchFeed';

export const metadata = getMetadata({ asPath: '/' });

export default async function Home() {
  // Successful reads render in the initial HTML; failures retain the feed's existing retry boundary.
  const initialState = await prefetchLatestFeed().catch(() => undefined);
  return (
    <GlobalErrorBoundary>
      <WithHeader>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: META.siteName,
            url: META.url,
            description: META.description,
            inLanguage: 'ko-KR',
          }}
        />
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
