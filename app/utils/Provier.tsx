'use client';

import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import React from 'react';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
