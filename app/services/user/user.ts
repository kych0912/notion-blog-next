import axios from 'axios';

export const getAuth = async ():Promise<AuthReponse> => {    
    try {
        const res = await axios.get(`/api/user/auth`);
        return {
            id:res.data.id,
            isLogged:res.data.isLogged,
            message:res.data.message
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

        await axios.post("/write",{
            data:writeData
        })

        const res = await axios.get(`/api/user/logout`);
        return res;
    } catch (err) {
        throw err;
    }
}
