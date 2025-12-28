'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';

import RefetchPage from '@/app/components/Error/_components/RefetchPage/RefetchPage';

export default function NotFound() {
  useEffect(() => {
    toast.error('페이지를 찾을 수 없습니다');
  }, []);
  return (
    <>
      <RefetchPage message="페이지를 찾을 수 없습니다" refetch={() => window.location.reload()} />
    </>
  );
}
