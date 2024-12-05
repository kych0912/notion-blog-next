import executeQuery from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

export async function findUserByName(name:string){
    const query = `SELECT * FROM user WHERE name=?`;

    try {
        const data = await executeQuery(query, [name]);

        if (data === null || (typeof data === 'object' && (data as any[]).length === 0)) {
            return null;
        }

        if(typeof data === 'undefined'){
            return null;
        }

        return (data as any[])[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}       

export async function comparePassword(password:string,hash:string){

    try{
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export async function generateToken(id:string){
    const token = jwt.sign({ id: id }, 'SECRET_KEY', { expiresIn: '3d' });

    return token;
}   

export async function createUser(id:string,name:string,password:string,avatar:string,email:string){
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword:string = await bcrypt.hash(password, salt);

    const query = `INSERT INTO user(id,name, password,avatar,email) VALUES(?,?,?,?,?)`;

    try {
        const data = await executeQuery(query, [id,name,hashedPassword,avatar,email]);
        return data;
    } catch (err:any) {
        throw err;
    }
}

export async function getUserInfoAndPostByName(name:string){
    const query = `SELECT * FROM user WHERE name=?`;

    try {
        const data = await executeQuery(query, [name]);
        return data;
    } catch (err:any) {
        throw err;
    }
}

export async function getUserInfoById(id:string){
    const query = `SELECT * FROM user WHERE id=?`;

    try {
        const data = await executeQuery(query, [id]);
        return data;
    } catch (err:any) {
        throw err;
    }
}