import jwt from 'jsonwebtoken';

export function verifyToken(token:string){
    try{
        const decoded = jwt.verify(token, 'SECRET_KEY');
        return decoded;
    }
    catch(err){
        throw err;
    }
}