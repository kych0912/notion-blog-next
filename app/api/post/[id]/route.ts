import {NextResponse} from 'next/server';
import { NextApiRequest } from 'next';
import { getUserPosts } from '@/app/lib/postData/postDB';

export async function GET(req:NextApiRequest, { params }: { params: { id: string } }){
    try{
        const id = params.id;
        
        const res = await getUserPosts(id);
        return NextResponse.json(res,{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}