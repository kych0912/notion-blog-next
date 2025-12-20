'use client';
import { Suspense } from 'react';

import LoadingPage from '@/app/components/LoadingPage';

import { PageIdProvider } from './PageIdProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PageIdProvider>{children}</PageIdProvider>
    </Suspense>
  );
}
