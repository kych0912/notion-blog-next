import {useMutation} from "@tanstack/react-query";
import {uploadPost,deletePost} from "../../services/post/post";
import { useRouter } from "next/navigation";

export function useUploadPost(){
    const router = useRouter();

    return useMutation({
        mutationFn:uploadPost,
        onSuccess:()=>{
            location.reload();
            router.push("/");
        }
    })
}

export function useDeletePostMutation(){
    const router = useRouter();
    return useMutation({
        mutationFn:deletePost,
        onSuccess:()=>{
            router.push("/");
            location.reload();
        }
    })
}