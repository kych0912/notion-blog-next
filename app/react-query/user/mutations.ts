import { useMutation } from "@tanstack/react-query";
import {login,logout} from "../../services/user/user";
import {useRouter} from "next/navigation"


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