import axios from 'axios';

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
        throw err;
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

const writeData = {
    id: "writeData",
    password: "writeData"
}


export const logout = async () => {
    try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/logout`,{ headers: { "Content-Type": "multipart/form-data" },withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
}

export const getAccessToken = async (code:string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/getAccessToken?code=${code}`,{ 
            withCredentials: true
         });
          console.log(res);
        return res;
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