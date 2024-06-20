import { useState, useEffect } from "react";
import { getPage } from "@/app/lib/notion-api";
import { ExtendedRecordMap } from "notion-types";
import { Box } from "@mui/material";
import NotionPage from "@/app/components/PostDetail/Post";
import {getPostDetail} from '@/app/services/post/post';
import { notFound } from "next/navigation";
import { cookies } from "next/headers";


async function Post({params}: {params:{id:string,user:string }}){    
    const id = params.id;
    const user = params.user;
    let avatar_url = '';
    let recordMap: ExtendedRecordMap;
    let isAuthor = false;
    
    const cookieStore = cookies();
    const token = cookieStore.get('x_auth')?.value ?? '';    

    try{
        const _response = await getPostDetail(id,user,token);
        const PageId = _response.data[0].id;
        avatar_url = _response.data[0].avatar;
        isAuthor = _response.isAuthor;
        recordMap = await getPage(PageId);
    }    
    catch(err){
        notFound();
    }

    return(
        <>
            <NotionPage 
                id={id}
                recordMap={recordMap} 
                user={params.user}
                isAuthor={isAuthor}
                avatar={avatar_url}
            />
        </>
    )
}

export default Post;