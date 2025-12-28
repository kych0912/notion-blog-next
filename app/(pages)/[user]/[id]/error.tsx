'use client';

import { AxiosError } from 'axios';

import RefetchPage from '@/app/components/Error/_components/RefetchPage/RefetchPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; response?: { status?: number } };
  reset: () => void;
}) {
  if (error.message.includes('invalid notion pageId')) {
    return (
      <>
        <RefetchPage message="유효하지 않은 Notion URL입니다." refetch={() => reset()} />
      </>
    );
  }

  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 400:
        return (
          <>
            <RefetchPage message="유효하지 않은 Notion URL입니다." refetch={() => reset()} />
          </>
        );
      case 409:
        return (
          <>
            <RefetchPage message="이미 존재하는 포스트입니다." refetch={() => reset()} />
          </>
        );
      default:
        return (
          <>
            <RefetchPage message="서버 에러가 발생했습니다" refetch={() => reset()} />
          </>
        );
    }
  }

  return (
    <>
      <RefetchPage message="서버 에러가 발생했습니다" refetch={() => reset()} />
    </>
  );
}
