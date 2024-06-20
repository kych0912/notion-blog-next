import axios from "axios";
import { headers } from "next/headers";

interface PostData{
    notionUrl:string|undefined,
    description:string|undefined,
}

export async function uploadPost(data:PostData){
    try{
        const body = {
            notionUrl:data.notionUrl,
            description:data.description
        }

        const res = await axios.post("/api/post/write",body);
        return{
            message:res.data.message,
            isSuccess:res.data.isSuccess
        }
    }
    catch(err){
        throw err;
    }
}

export async function getLatestPosts(){
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/latest`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export async function getUserPosts(id:string){
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/user/${id}`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export async function getPostDetail(id:string,user:string,token:string){
    try{
        const headers={
            headers:{
                'x_auth':token
            }
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/${user}/${id}`,headers);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export async function deletePost(id:string){
    try{
        const res = await axios.delete(`/api/post/delete/${id}`);
        return res.data;
    }
    catch(err){
        throw err;
    }

}
