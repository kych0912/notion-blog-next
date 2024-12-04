import { getPostDetail } from "@/app/services/post/post";
import { getPage } from "@/app/lib/notion-api";
import { notFound } from "next/navigation";
import NotionPage from "@/app/components/PostDetail/Post";

export default async function DetailContent({ id, user, token }: { 
    id: string, 
    user: string, 
    token: string 
}) {
    try{
        const recordMap = await getPage(id);
        const _response = await getPostDetail(id, user, token);

        return <NotionPage 
            id={id}
            recordMap={recordMap}
            user={user}
            isAuthor={_response.isAuthor}
            avatar={_response.data[0].avatar}
            isChild={_response.isChild}
        />;
    }
    catch(err:any){
        if(err?.response?.status === 404) {
            notFound();
        }
        throw err;
    }
}       