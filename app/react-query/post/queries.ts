import {useQuery} from '@tanstack/react-query';
import { getLatestPosts } from '@/app/services/post/post';

export const useLatestPosts = async () => {
    return(
        useQuery<Iposts[]>({
            queryKey: ["latestPosts"],
            queryFn: getLatestPosts,
        })  
    )
}