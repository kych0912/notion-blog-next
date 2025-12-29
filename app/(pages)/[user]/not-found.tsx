'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import RefetchPage from '@/app/components/Error/_components/RefetchPage/RefetchPage';

export default function NotFound() {
  useEffect(() => {
    toast.error('존재하지 않는 유저입니다.');
  }, []);

  return (
    <>
      <RefetchPage message="존재하지 않는 유저입니다." refetch={() => window.location.reload()} />
    </>
  );
}
