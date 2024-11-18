import { useUploadPost } from "@/app/react-query/post/mutations";
import { useNotionPage } from "@/app/context/NotionPageContext";

export function useNotionUploader(){
    const { isPending, mutate, error} = useUploadPost();    
    const {recordMap} = useNotionPage();

    if(error) throw error;
    const handleUploadPost = (pageId:string) => {
        if(pageId && recordMap) mutate({
            notionUrl:pageId
        });
    }

    return { isPending, mutate, handleUploadPost };
}   
