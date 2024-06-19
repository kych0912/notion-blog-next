import {NextResponse, NextRequest} from 'next/server';
import { getLatestPosts } from '@/app/lib/postData/postDB';


export async function GET(req:NextRequest){
    try{
        const res = await getLatestPosts();
        return NextResponse.json(res,{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}