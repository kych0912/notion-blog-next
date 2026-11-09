'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ProfileActions({ userId }: { userId?: string }) {
  const { data: session } = useSession();
  if (!userId || session?.user?.id !== userId) return null;
  return (
    <Link href="/write" prefetch={false} className="profile-write">
      새 글 쓰기
    </Link>
  );
}
