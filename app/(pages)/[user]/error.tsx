'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';

import RefetchPage from '@/app/components/Error/_components/RefetchPage/RefetchPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; response?: { status?: number } };
  reset: () => void;
}) {
  const errorStatus = error?.response?.status || 500;

  useEffect(() => {
    toast.error('서버 에러가 발생했습니다');
  }, []);

  switch (errorStatus) {
    default:
      return (
        <>
          <RefetchPage message="서버 에러가 발생했습니다" refetch={reset} />
        </>
      );
  }
}
