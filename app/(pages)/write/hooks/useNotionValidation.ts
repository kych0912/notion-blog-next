'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parsePageId } from 'notion-utils';

import { usePageId } from './usePageIdContext';

export function useNotionUrlValidation() {
  const searchParams = useSearchParams();
  const searchPageId = searchParams.get('pageId');
  const [url, setDraftUrl] = useState(searchPageId ?? '');
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { pageId: loadedPageId, setPageId } = usePageId();

  const setUrl = (value: string) => {
    setDraftUrl(value);
    setIsError(false);
    // Editing to a different page invalidates the previous preview and publish action.
    if (parsePageId(value.trim()) !== loadedPageId) setPageId(null);
  };

  const handleSubmit = () => {
    const pageId = parsePageId(url.trim());
    const timestamp = Date.now();
    if (pageId) {
      setIsError(false);
      setPageId(pageId);
      router.push(`/write?pageId=${pageId}&timestamp=${timestamp}`);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    setDraftUrl((current) =>
      parsePageId(current.trim()) === searchPageId ? current : (searchPageId ?? ''),
    );
    setIsError(false);
  }, [searchPageId]);

  const resetError = () => setIsError(false);

  return { url, setUrl, isError, handleSubmit, resetError };
}
