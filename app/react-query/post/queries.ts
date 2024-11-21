import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import { getLatestPosts, getRecordMap } from '@/app/services/post/post';
import { ExtendedRecordMap } from 'notion-types';


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