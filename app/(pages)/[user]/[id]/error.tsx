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
        case 400:
            return (
                <>
                    <RefetchPage refetch={()=>window.location.reload()}/>
                    <ErrorHandler message="유효하지 않은 Notion URL입니다." type="snackbar"/>
                </>
            );
        case 409:
            return (
                <> 
                    <RefetchPage refetch={()=>window.location.reload()}/>
                    <ErrorHandler message="이미 존재하는 포스트입니다." type="snackbar"/>
                </>
            );
        default:
            return (
                <>
                    <RefetchPage refetch={()=>window.location.reload()}/>
                    <ErrorHandler message="서버 에러가 발생했습니다" type="snackbar"/>
                </>
            );
    }
} 