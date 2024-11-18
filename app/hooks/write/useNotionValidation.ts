'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parsePageId } from "notion-utils";

//parsePageId 함수를 사용하여 유효한 pageId인지 검사
export function useNotionUrlValidation() {
    const [url, setUrl] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        const pageId = parsePageId(url);
        if (pageId) {
            setIsError(false);
            router.push(`/write?pageId=${pageId}`);
        } else {
            setIsError(true);
        }
    };

    useEffect(()=>{
        setIsError(false);
    },[url])

    const resetError = () => setIsError(false);

    return { url, setUrl, isError, handleSubmit, resetError };
}