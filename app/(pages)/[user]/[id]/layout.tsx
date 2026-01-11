import type { ReactNode } from 'react';
import { Suspense } from 'react';

import PostPageSkeleton from '../../../components/Post/Header/_components/PostPageSkeleton';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Suspense fallback={<PostPageSkeleton />}>{children}</Suspense>;
}
