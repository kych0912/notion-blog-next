'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parsePageId } from "notion-utils";

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

    const resetError = () => setIsError(false);

    return { url, setUrl, isError, handleSubmit, resetError };
}