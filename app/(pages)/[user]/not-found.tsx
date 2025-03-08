'use client'

import ErrorHandler from "@/app/components/Error/ErrorHandler";
import RefetchPage from "@/app/components/Error/_components/RefetchPage/RefetchPage";

export default function NotFound() {

    return (
        <>
            <RefetchPage 
                message="존재하지 않는 유저입니다."
                refetch={() => window.location.reload()}/>
            <ErrorHandler message="존재하지 않는 유저입니다." type="snackbar"/>
        </>
    );
} 