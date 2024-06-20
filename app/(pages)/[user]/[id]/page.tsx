import { useState, useEffect } from "react";
import { getPage } from "@/app/lib/notion-api";
import { ExtendedRecordMap } from "notion-types";
import { Box } from "@mui/material";
import NotionPage from "@/app/components/PostDetail/Post";
import {getPostDetail} from '@/app/services/post/post';
import { notFound } from "next/navigation";


async function Post({params}: {params:{id:string,user:string }}){    
    const id = params.id;
    const user = params.user;
    let recordMap: ExtendedRecordMap;
    const rootDomain = `/${user}/${id}`

    try{
        const _response = await getPostDetail(id,user);
        const PageId = _response.data[0].id;
        recordMap = await getPage(PageId);
    }    
    catch(err){
        notFound();
    }

    return(
        <>
            <NotionPage 
                recordMap={recordMap} 
                rootDomain={rootDomain} 
                rootPageId={id} 
                user={params.user}
            />
        </>
    )
}

export default Post;