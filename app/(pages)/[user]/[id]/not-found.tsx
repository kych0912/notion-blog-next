'use client';

import ErrorHandler from "@/app/components/Error/ErrorHandler";
import RefetchPage from "@/app/components/Error/_components/RefetchPage/RefetchPage";

export default function NotFound() {
    return (
        <>
            <RefetchPage refetch={() => window.location.reload()}/>
            <ErrorHandler message="페이지를 찾을 수 없습니다" type="snackbar"/>
        </>
    );
} 