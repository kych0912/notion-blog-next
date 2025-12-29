import { Suspense, type ReactNode } from 'react';

import WithHeader from '@/app/components/Layout/WithHeaderLayout';

import UserPageSkeleton from './_components/UserPageSkeleton';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <WithHeader>
      <Suspense fallback={<UserPageSkeleton />}>{children}</Suspense>
    </WithHeader>
  );
}
