import type { ReactNode } from 'react';

import WithHeader from '@/app/components/Layout/WithHeaderLayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <WithHeader>{children}</WithHeader>;
}
