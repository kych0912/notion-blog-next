import { useUploadPost } from "@/app/react-query/post/mutations";
import { useNotionPage } from "@/app/context/NotionPageContext";

export function useNotionUploader(){
    const { isPending, mutate } = useUploadPost();    
    const {recordMap} = useNotionPage();

    const handleUploadPost = (pageId:string) => {
        if(pageId && recordMap) mutate(pageId);
    }

    return { isPending, mutate, handleUploadPost };
}   
