import axios from 'axios';
import { AxiosError } from 'axios';

export const getAuth = async () => {    
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/auth`,{ headers: { "Content-Type": "multipart/form-data" },withCredentials: true });
        return {
            id:res.data.id,
            isLogged:res.data.isLogged,
            message:res.data.message,
            user:res.data.user   
        };
    } catch (err) {
        return err;
    }
}

export const login = async (data:{
        id:string,
        password:string
    }) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/login`, data);
        return res;
    } catch (err) {
        throw err;
    }
}

export const logout = async () => {
    try {

        const res = await axios.get(`/api/user/logout`,{ headers: { "Content-Type": "multipart/form-data" },withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
}

export const getAccessToken = async (code:string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/getAccessToken?code=${code}`);
        const _data = res.data;

        //server component에서 client component로 데이터 전달 시, Promise 객체를 전달한다.
        //하지만 Promise 객체는 JSON.stringify를 사용할 수 없다.
        //nextjs 의 특징
        //따라서, JSON.stringify를 사용하려면, Promise 객체를 data 객체로 변환해야한다.
        return _data;
    } catch (err) {
        throw err;
    }
}

export const getUserInfo = async (id:string) =>{
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/${id}`);
        return res.data;
    }
    catch(err){
        console.log(err)
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