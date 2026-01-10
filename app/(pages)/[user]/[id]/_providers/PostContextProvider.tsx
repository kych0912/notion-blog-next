'use client';

import type { ReactNode } from 'react';
import { type ExtendedRecordMap } from 'notion-types';

import { PostContext } from '../_contexts/usePostContext';

export default function PostContextProvider({
  user,
  id,
  recordMap,
  children,
}: {
  user: string;
  id: string;
  recordMap: ExtendedRecordMap;
  children: ReactNode;
}) {
  return <PostContext.Provider value={{ user, id, recordMap }}>{children}</PostContext.Provider>;
}
