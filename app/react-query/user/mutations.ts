import { useMutation } from "@tanstack/react-query";
import {useRouter} from "next/navigation"

import {login,logout} from "../../services/user/user";


export const useLogin = () => {
    const router = useRouter();
    return(
        useMutation({
            mutationFn: login,
            onSuccess: () => {
              location.reload();
            },
        })
    )
}

export const useLogout = () => {
    const router = useRouter();
    return(
        useMutation({
            mutationFn: logout,
            onSuccess: () => {
                location.reload();
            },
        })
    )
}