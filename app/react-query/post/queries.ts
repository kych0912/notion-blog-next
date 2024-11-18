import {useQuery} from '@tanstack/react-query';
import { getLatestPosts, getRecordMap } from '@/app/services/post/post';
import { ExtendedRecordMap } from 'notion-types';

export const useLatestPosts = () => {
    return(
        useQuery<Iposts[]>({
            queryKey: ["latestPosts"],
            queryFn: getLatestPosts,
        })  
    )
}

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
