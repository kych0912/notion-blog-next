'use client';
import { Spinner } from '@/app/components/shared/spinner';

export const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/90">
    <Spinner className="h-10 w-10 text-[#96C2F7]" />
  </div>
);
