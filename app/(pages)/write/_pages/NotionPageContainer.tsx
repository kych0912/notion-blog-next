'use client'
import NewPost from "./NewPost";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';

export default function NotionPageContainer({
    children,
}:{
    children: React.ReactNode,
}){

    const [url, setUrl] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if (url) {
            router.push(`?url=${encodeURIComponent(url)}`, { scroll: false });
        }
    };

    return (
        <>
            <NewPost
                url={url}
                setUrl={setUrl}
                onSubmit={handleSubmit}
            />
            {children}
        </>
    );
}