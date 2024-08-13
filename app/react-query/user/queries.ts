import {useQuery,UseSuspenseQueryOptions} from '@tanstack/react-query';
import { getAuth } from '@/app/services/user/user';

interface TAuthReturn{
    id:string,
    isLogged:boolean,
    message:string,
    user:{
        name:string,
        avatar_url:string
    }
}

export const useAuth = () => {
    return(
        useQuery<TAuthReturn>({
            queryKey: ['auth'],
            queryFn: getAuth,
            retry:false,
        })
    )
}