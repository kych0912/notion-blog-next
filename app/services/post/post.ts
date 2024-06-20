import axios from "axios";

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
        const res = await axios.get("http://127.0.0.1:3000/api/post/latest");
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export async function getUserPosts(id:string){
    try{
        const res = await axios.get(`http://127.0.0.1:3000/api/post/user/${id}`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export async function getPostDetail(id:string,user:string){
    try{
        const res = await axios.get(`http://127.0.0.1:3000/api/post/${user}/${id}`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}