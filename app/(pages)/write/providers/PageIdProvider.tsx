import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { PageIdContext } from '../hooks/usePageIdContext';

export function PageIdProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const searchPageId = searchParams.get('pageId');

  const [pageId, setPageId] = useState<string | null>(searchPageId ?? null);

  useEffect(() => {
    setPageId(searchPageId ?? null);
  }, [searchPageId]);

  return <PageIdContext.Provider value={{ pageId, setPageId }}>{children}</PageIdContext.Provider>;
}
