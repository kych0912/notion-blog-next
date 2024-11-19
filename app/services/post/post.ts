import axios from "axios";

interface PostData{
    notionUrl:string|undefined,
}

export async function uploadPost(data:PostData){
    const body = {
        notionUrl:data.notionUrl,
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/write`,body,{
        withCredentials: true 
        });
    return{
        message:res.data.message,
        isSuccess:res.data.isSuccess
    }
}

export async function getLatestPosts(pageParam:number){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/latest?page=${pageParam}`);

    console.log(res);
    return res.data;
}

export async function getUserPosts(id:string){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/user/${id}`);
    return res.data;
}

export async function getPostDetail(id:string,user:string,token:string){
    const config = {
        headers: {
            'X-Next-Auth-Session-Token': token,
        }
        };
        
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/${user}/${id}`, config);
    return res.data;
}

export async function deletePost(id:string){
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/delete/${id}`,{
        withCredentials: true 
        });
    return res.data;
}

export async function getRecordMap(pageId:string){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/notion/page?pageId=${pageId}`);
    return res.data;
}
