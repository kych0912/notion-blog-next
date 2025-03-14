export const dynamic = 'force-dynamic';

import {NextResponse, NextRequest} from 'next/server';
import { getLatestPosts } from '@/app/lib/postData/postDB';


export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page');

    try{
        const res = await getLatestPosts( parseInt(page || '1') );
        return NextResponse.json(res,{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}