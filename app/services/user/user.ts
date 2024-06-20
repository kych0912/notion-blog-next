import axios from 'axios';

export const getAuth = async () => {    
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();
        return {
            id: res.id,
            isLogged: res.isLogged,
            message: res.message,
            user: res.user
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

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/logout`,{
            withCredentials: true
          });
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