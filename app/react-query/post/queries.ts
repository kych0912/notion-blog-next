import {useInfiniteQuery, useQueries, useQuery} from '@tanstack/react-query';
import { getLatestPosts, getPostDetail, getRecordMap } from '@/app/services/post/post';
import { ExtendedRecordMap } from 'notion-types';

export const useRecordMapFetch = (pageId:string) => {
    return(
        useQuery<ExtendedRecordMap>({
            queryKey: ["recordMap",pageId],
            queryFn: () => getRecordMap(pageId),
            enabled: !!pageId,
            retry:false,
            refetchOnWindowFocus:false,
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
            refetchOnReconnect:false,
            staleTime: 0,
        })  
    )
}

export const usePostDetailFetch = (pageId:string, user:string, token:string) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['page', pageId],
                queryFn: () => getRecordMap(pageId),
                enabled: !!pageId,
                retry:false,
                refetchOnWindowFocus:false,

                refetchOnReconnect:false,
                throwOnError:true,
            },
            {
                queryKey: ['postDetail', pageId],
                queryFn: () => getPostDetail(pageId, user, token),
                enabled: !!pageId,
                retry:false,
                refetchOnWindowFocus:false,

                refetchOnReconnect:false,
                throwOnError:true,
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