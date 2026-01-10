'use client';

import { createContext, useContext } from 'react';
import type { ExtendedRecordMap } from 'notion-types';

interface PostContextType {
  user: string;
  id: string;
  recordMap: ExtendedRecordMap;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePostContext = () => {
  const ctx = useContext(PostContext);
  if (!ctx) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return ctx;
};
