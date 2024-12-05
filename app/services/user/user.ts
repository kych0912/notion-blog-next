import axios from 'axios';
import { AxiosError } from 'axios';

interface TAuthReturn{
    id:string,
    isLogged:boolean,
    message:string,
    user:{
        name:string,
        avatar_url:string
    }
}

export const getAuth = async ():Promise<TAuthReturn>=> {    
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/auth`,{ headers: { "Content-Type": "multipart/form-data" },withCredentials: true });
    return {
        id: res.data.id,
        isLogged: res.data.isLogged,
        message: res.data.message,
        user: res.data.user   
    };
}

export const login = async (data:{
        id:string,
        password:string
    }) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/login`, data);
        return res;
    } catch (err) {
        return err;
    }
}

export const logout = async () => {
    try {

        const res = await axios.get(`/api/user/logout`,{ headers: { "Content-Type": "multipart/form-data" },withCredentials: true });
        return res;
    } catch (err) {
        return err;
    }
}

export const updateUser = async (id:string,name:string,avatar_url:string,email:string) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/updateUser`,{
        id:id,
        name,
        avatar_url,
        email
    });
    const _data = res.data;

    //server component에서 client component로 데이터 전달 시, Promise 객체를 전달한다.
    //하지만 Promise 객체는 JSON.stringify를 사용할 수 없다.
    //nextjs 의 특징
    //따라서, JSON.stringify를 사용하려면, Promise 객체를 data 객체로 변환해야한다.
    return _data;
}

export const getUserInfoAndPostByName = async (name:string) =>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user?name=${name}`);
    return res.data;
}

export const getUserInfoById = async (id:string)=>{
    try{    
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/${id}`);
        return res.data.data;
    }
    catch(err:any){
        if(err.response?.status === 404){
            return [];
        }
        throw err;
    }
}


axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            
            
        }
        return Promise.reject(error);
    }
);