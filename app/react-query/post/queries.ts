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
            queryKey: ["recordMap"],
            queryFn: () => getRecordMap(pageId),
            enabled: !!pageId,
            retry:false,
            throwOnError:true,
            refetchOnWindowFocus:false,
            refetchOnMount:false,
            refetchOnReconnect:false,
        })  
    )
}   
