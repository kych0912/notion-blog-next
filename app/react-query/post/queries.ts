import {useInfiniteQuery, useQueries, useQuery} from '@tanstack/react-query';
import { getLatestPosts, getPostDetail, getRecordMap } from '@/app/services/post/post';
import { ExtendedRecordMap } from 'notion-types';
import { getPage } from '@/app/lib/notion-api';

export const useRecordMapFetch = (pageId:string) => {
    return(
        useQuery<ExtendedRecordMap>({
            queryKey: ["recordMap",pageId],
            queryFn: () => getRecordMap(pageId),
            enabled: !!pageId,
            retry:false,
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
        })  
    )
}   

export const useLatestPostsInfinite = () =>{
    return(
        useInfiniteQuery({
            queryKey: ['latest-posts'],
            queryFn: ({ pageParam = 1 }) =>getLatestPosts(pageParam),
            getNextPageParam: (lastPage, allPages) => {
                if ( lastPage.length < 10) return undefined;
                return allPages.length + 1;
            },
            initialPageParam: 1,
            retry:false,
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
        })  
    )
}

export const usePostDetailFetch = (pageId:string, user:string, token:string) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['page', pageId],
                queryFn: () => getPage(pageId),
            },
            {
                queryKey: ['postDetail', pageId],
                queryFn: () => getPostDetail(pageId, user, token),
            },
        ],
    });

    return {
        isLoading: results.some(result => result.isLoading),
        isError: results.some(result => result.isError),
        data: results.map(result => result.data),
        errors: results.map(result => result.error),
    };
}