'use client'
import NewPost from "./NewPost";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { parsePageId } from "notion-utils";

export default function NotionPageContainer({
    children,
}:{
    children: React.ReactNode,
}){

    const [url, setUrl] = useState('');
    const router = useRouter();

    const handleSubmit = () => {
        if (url) {
            const pageId = parsePageId(url);
            router.push(`?pageId=${pageId}`, { scroll: false });
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