import { getPage } from "@/app/lib/notion-api";
import axios from "axios";
import { NotionAPI } from "notion-client";


export async function uploadPost(pageId:string){
    const body = {
        notionUrl:pageId,
    }

    const res = await axios.post(`/api/post/write`,body,{
        withCredentials: true 
        });
    return{
        message:res.data.message,
        isSuccess:res.data.isSuccess
    }
}

export async function getLatestPosts(pageParam:number = 1){
    const res = await axios.get(`/api/post/latest?page=${pageParam}`);

    return res.data;
}

export async function getUserPosts(id:string){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/user/${id}`);
    return res.data;
}

//client에서 사용
export async function getPostDetail(id:string,user:string,token:string){
    const config = {
        headers: {
            'X-Next-Auth-Session-Token': token,
        }
        };
        
    const res = await axios.get(`/api/post/${user}/${id}`, config);
    return res.data;
}

export async function deletePost(id:string){
    const res = await axios.delete(`/api/post/delete/${id}`,{
        withCredentials: true 
        });
    return res.data;
}

export async function getRecordMap(pageId:string){
    const res = await axios.get(`/api/notion/page?pageId=${pageId}`);
    return res.data;
}

export async function fetchPostAndRecordMap(postId: string, user: string, token: string, pageId: string) {
    const config = {
        headers: {
            'X-Next-Auth-Session-Token': token,
        }
    };
    const notion = new NotionAPI();

    const [postDetail, recordMap] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/${user}/${postId}`, config),
        notion.getPage(pageId)
    ]);

    return {
        postDetail: postDetail.data,
        recordMap: recordMap
    };
}

