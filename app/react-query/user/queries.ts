import {useQuery} from '@tanstack/react-query';
import { getAuth } from '@/app/services/user/user';

export const useAuth = () => {
    return(
        useQuery({
            queryKey: ['auth'],
            queryFn: ()=>getAuth(),
            retry:false,
        })
    )
}