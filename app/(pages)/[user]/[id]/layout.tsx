import { Suspense, type ReactNode } from 'react';

import PostPageSkeleton from './_components/PostPageSkeleton';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Suspense fallback={<PostPageSkeleton />}>{children}</Suspense>;
}
