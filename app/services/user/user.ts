import axios from 'axios';

export const getAuth = async () => {    
    try {
        const res = await axios.get(`/api/user/auth`);
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
        const res = await axios.post(`/api/user/login`, data);
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

        const res = await axios.get(`/api/user/logout`);
        return res;
    } catch (err) {
        throw err;
    }
}

export const getAccessToken = async (code:string) => {
    try {
        const res = await axios.get(`/api/user/getAccessToken?code=${code}`);
        return res;
    } catch (err) {
        throw err;
    }
}

export const getUserInfo = async (id:string) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:3000/api/user/${id}`);
        return res.data;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}