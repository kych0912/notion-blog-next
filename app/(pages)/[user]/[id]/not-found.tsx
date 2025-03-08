'use client';

import ErrorHandler from "@/app/components/Error/ErrorHandler";
import RefetchPage from "@/app/components/Error/_components/RefetchPage/RefetchPage";

export default function NotFound() {
    console.log("not found");
    return (
        <>
            <RefetchPage message="페이지를 찾을 수 없습니다" refetch={() => window.location.reload()}/>
            <ErrorHandler message="페이지를 찾을 수 없습니다" type="snackbar"/>
        </>
    );
} 