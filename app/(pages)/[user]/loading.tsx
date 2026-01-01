'use client';
import { usePathname } from 'next/navigation';

import UserPageSkeleton from './_components/UserPageSkeleton';

export default function Loading() {
  const pathname = usePathname();
  const isNestedRoute = pathname.split('/').length > 2;

  if (isNestedRoute) return undefined;

  return <UserPageSkeleton />;
}
