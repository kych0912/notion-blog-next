import {NextResponse} from 'next/server';
import { NextApiRequest } from 'next';
import { getPostDetail } from '@/app/lib/postData/postDB';
import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/jwt';

export async function GET(req:NextApiRequest, { params }: { params: { id: string, user:string } }){
    try{
        const id = params.id;
        const user = params.user;
        const token = await cookies().get('x_auth');
        let isAuthor = false;
        let author = null;
        
        if (token) {
            try {
                const decoded = verifyToken(token.value);
                if (typeof decoded !== 'string') {
                    isAuthor = true;
                    author = decoded.id;
                }
            } catch (err) {
                isAuthor = false; // Token is invalid or expired
            }
        }

        const res = await getPostDetail(id,user);

        if(!Array.isArray(res) || res.length === 0){
            return NextResponse.json({message:"Post Not Found",isSuccess:false},{status:404})
        }
        return NextResponse.json({data:res,isAuthor:isAuthor},{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}