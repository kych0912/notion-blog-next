import type { Metadata } from 'next';
import { Suspense } from 'react';

import ErrorPage from './_components/Error';

export const metadata: Metadata = {
  title: '로그인 오류 - NextBlog',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6">
      <div className="mb-2 text-xl font-bold">로그인 오류</div>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage />
      </Suspense>
    </div>
  );
}
