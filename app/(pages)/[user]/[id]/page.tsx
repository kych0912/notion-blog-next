import { useState, useEffect } from "react";
import { getPage } from "@/app/lib/notion-api";
import { ExtendedRecordMap } from "notion-types";
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
    const token = cookieStore.get(process.env.NEXTAUTH_COOKIE_NAME as string)?.value ?? '';

    try {
        const _response = await getPostDetail(id, user, token);

        const isChild = _response.isChild;

        //자식 페이지 일 경우
        if(isChild){
            recordMap = await getPage(id);
            return(
                <NotionPage 
                    id={id}
                    recordMap={recordMap} 
                    user={params.user}
                    isAuthor={isAuthor}
                    avatar={avatar_url}
                    isChild={true}
                />
            )
        }

        //자식 페이지일 경우 avatar_url, isAuthor 설정 X

        //부모 페이지 일 경우
        const PageId = _response.data[0].id;
        avatar_url = _response.data[0].avatar;
        isAuthor = _response.isAuthor;

        recordMap = await getPage(PageId);

        return(
            <>
                <NotionPage 
                    id={id}
                    recordMap={recordMap} 
                    user={params.user}
                    isAuthor={isAuthor}
                    avatar={avatar_url}
                    isChild={false} 
                />
            </>
        )
        
    } catch (err) {
        console.log(err);
        notFound();
    }
}

export default Post;