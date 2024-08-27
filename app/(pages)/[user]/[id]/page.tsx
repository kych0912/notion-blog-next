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

    //get 요청에 쿠키 전달을 위한 토큰 설정
    //SSR에서는 쿠키를 사용할 수 없으므로 클라이언트에서 쿠키를 사용하도록 설정
    const cookieStore = cookies();
    const token = cookieStore.get("next-auth.session-token")?.value ?? '';

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