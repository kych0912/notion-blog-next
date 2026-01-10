import { useEffect, useRef } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

export function useQueryEffect<TData, TError>(
  query: UseQueryResult<TData, TError>,
  callbacks: Partial<{
    onSuccess: (data: TData) => void;
    onError: (error: TError) => void;
  }>,
) {
  const callbacksRef = useRef(callbacks);

  callbacksRef.current = callbacks;

  // onSuccess
  useEffect(() => {
    if (query.data) {
      callbacksRef.current.onSuccess?.(query.data);
    }
  }, [query.data]);

  // onError
  useEffect(() => {
    if (query.error) {
      callbacksRef.current.onError?.(query.error);
    }
  }, [query.error]);
}
