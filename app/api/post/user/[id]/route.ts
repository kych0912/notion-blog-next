export const dynamic = 'force-dynamic';
import {NextResponse,NextRequest} from 'next/server';
import { getUserPosts } from '@/app/lib/postData/postDB';

export async function GET(req:NextRequest, { params }: { params: { id: string } }){
    try{
        const id = params.id;
        
        const res = await getUserPosts(id);
        return NextResponse.json(res,{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}