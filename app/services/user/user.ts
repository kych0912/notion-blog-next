import axios from 'axios';

export const getAuth = async () => {    
    try {
        const res = await axios.get(`/api/user/auth`);
        return res;
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