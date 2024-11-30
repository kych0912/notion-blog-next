import {useMutation} from "@tanstack/react-query";
import {uploadPost,deletePost} from "../../services/post/post";
import { useRouter } from "next/navigation";
import { useError } from "@/app/context/ErrorContext";

export function useUploadPost(){
    const router = useRouter();
    const {setError} = useError();

    return useMutation({
        mutationFn:uploadPost,
        onSuccess:()=>{
            router.push("/");
        },
        onError:(error)=>{
            setError(error);
        }
    })
}

export function useDeletePostMutation(){
    const router = useRouter();
    return useMutation({
        mutationFn:deletePost,
        onSuccess:()=>{
            router.push("/");
        }
    })
}