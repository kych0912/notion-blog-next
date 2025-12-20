'use client';
import { useState } from 'react';

import { PageIdContext } from '../hooks/usePageIdContext';

export function PageIdProvider({ children }: { children: React.ReactNode }) {
  const [pageId, setPageId] = useState<string | null>(null);
  return <PageIdContext.Provider value={{ pageId, setPageId }}>{children}</PageIdContext.Provider>;
}
