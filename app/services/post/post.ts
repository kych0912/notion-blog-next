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

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/write`,body,{
            withCredentials: true 
          });
        return{
            message:res.data.message,
            isSuccess:res.data.isSuccess
        }
    }
    catch(err){
        return err;
    }
}

export async function getLatestPosts(){
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/latest`);
        return res.data;
    }
    catch(err){
        return err;
    }
}

export async function getUserPosts(id:string){
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/user/${id}`);
        return res.data;
    }
    catch(err){
        return err;
    }
}

export async function getPostDetail(id:string,user:string,token:string){
    try{
        const config = {
            headers: {
              'X-Next-Auth-Session-Token': token,
            }
          };
          
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/${user}/${id}`, config);
        return res.data;
    }
    catch(err){
        return err;
    }
}

export async function deletePost(id:string){
    try{
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/post/delete/${id}`,{
            withCredentials: true 
          });
        return res.data;
    }
    catch(err){
        return err;
    }

}
