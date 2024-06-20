import axios from 'axios';
import { NextResponse,NextRequest } from 'next/server';
import {getUserInfo} from '@/app/lib/UserData/UserDB';
import { getUserPosts } from '@/app/lib/postData/postDB';

export async function GET(req:NextRequest, { params }: { params: { id: string} }){
    try{
        const id = params.id;
        const user = await getUserInfo(id);
        const posts = await getUserPosts(id);
        return NextResponse.json({ data:[user,posts]}, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}