'use client'

import ErrorHandler from "@/app/components/Error/ErrorHandler";
import RefetchPage from "@/app/components/Error/_components/RefetchPage/RefetchPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; response?: { status?: number } }
  reset: () => void
}) {
    const errorStatus = error?.response?.status || 500;

    switch (errorStatus) {

        default:
            return (
                <>
                    <RefetchPage message="서버 에러가 발생했습니다" refetch={reset}/>
                    <ErrorHandler message="서버 에러가 발생했습니다" type="snackbar"/>
                </>
            );
    }
} 