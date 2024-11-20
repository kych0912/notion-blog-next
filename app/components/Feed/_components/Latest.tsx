'use client';

import { useInView } from "react-intersection-observer"
import { useEffect } from "react";
import { useLatestPostsInfinite } from "@/app/react-query/post/queries"
import FeedItem from "./FeedItem";

export default function Latest() {
    const { data:posts, isLoading, fetchNextPage, error }  = useLatestPostsInfinite();
    const { ref, inView } = useInView();

    if(error) throw error;

    useEffect(() => {
        if(inView) {
            fetchNextPage();
        }
    },[inView, fetchNextPage])

    // posts가 없을 때 로딩 UI
    if (isLoading || !posts) {
        return (
            <>
                {Array.from({length: 10}).map((_, index) => (
                    <FeedItem key={`skeleton-${index}`} isLoading={true} />
                ))}
            </>
        );
    }

    // 모든 페이지의 포스트를 하나의 배열로 합침
    const allPosts = posts.pages.flat();

    return(
        <>
            {allPosts.map((post, index) => (
                <FeedItem 
                    key={post.id || index} 
                    post={post}
                    ref={index === allPosts.length - 1 ? ref : undefined}
                />
            ))}
        </>
    )
}