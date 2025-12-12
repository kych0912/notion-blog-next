export const dynamic = 'force-dynamic';
import { NextResponse,NextRequest } from 'next/server';

import {getUserInfoAndPostByName} from '@/app/lib/UserData/UserDB';
import { getUserPosts } from '@/app/lib/postData/postDB';

export async function GET(req:NextRequest){
    try{
        const name = req.nextUrl.searchParams.get("name");

        if(!name){
            return NextResponse.json({ message: 'Invalid Request' }, { status: 400 });
        }

        const user = await getUserInfoAndPostByName(name);
        
        if(!Array.isArray(user) || user.length === 0) {
            return NextResponse.json({ message: 'Not Found' }, { status: 404 });
        }

        const posts = await getUserPosts(name);

        return NextResponse.json({ data:[user,posts]}, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}