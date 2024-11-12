import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parsePageId } from "notion-utils";

export function useNotionUrlValidation() {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        const pageId = parsePageId(url);
        if (pageId) {
            setError(false);
            router.push(`/write?pageId=${pageId}`);
        } else {
            setError(true);
        }
    };

    const resetError = () => setError(false);

    return { url, setUrl, error, handleSubmit, resetError };
}