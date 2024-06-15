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
