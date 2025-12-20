'use client';
import { createContext, useContext } from 'react';

interface PageIdContextType {
  pageId: string | null;
  setPageId: (pageId: string | null) => void;
}

export const PageIdContext = createContext<PageIdContextType | undefined>(undefined);

export function usePageId() {
  const context = useContext(PageIdContext);
  if (context === undefined) {
    throw new Error('usePageId must be used within a PageIdProvider');
  }
  return context;
}
