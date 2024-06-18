import {useMutation} from "@tanstack/react-query";
import {uploadPost} from "../../services/post/post";
import { useRouter } from "next/navigation";

export function useUploadPost(){
    const router = useRouter();

    return useMutation({
        mutationFn:uploadPost,
        onSuccess:()=>{
            router.push("/");
        }
    })
}