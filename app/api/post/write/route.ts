import {NextResponse, NextRequest} from 'next/server';
import { cookies } from 'next/headers';
import { getPage } from '@/app/lib/notion-api';
import { verifyToken } from '@/app/lib/jwt';
import * as Types from 'notion-types';
import { uploadPost,getPostById } from '@/app/lib/postData/postDB';
import { parsePageId } from 'notion-utils';
import { RowDataPacket } from 'mysql2';

export async function POST(req:NextRequest){
    const {notionUrl,description} = await req.json();
    const token = await cookies().get('x_auth');

    const id = parsePageId(notionUrl);
    try{
        //notionUrl,description 유효성 검사
        if(!id){
            return NextResponse.json({message:"Invalid Notion URL",isSuccess:false},{status:400})
        }
        if(!description){
            return NextResponse.json({message:"Invalid Input",isSuccess:false},{status:400})
        } 

        //토큰 유효성 검사
        if (typeof token === 'undefined') {
            return NextResponse.json({ message: 'Token Not Found', isSuccess: false}, { status: 401 });
        }
        const decoded = verifyToken(token.value); // Pass the value of the token cookie
        if(typeof decoded === 'string'){
            return NextResponse.json({ message: 'Invalid Token', isSuccess: false}, { status: 401 });
        }

        const userId = decoded.id;

        //노션 링크 유효성 검사
        let recordMap:Types.ExtendedRecordMap;
        try{
            recordMap = await getPage(id);
        }
        catch(err){
            return NextResponse.json({message:"Invalid Notion URL",isSuccess:false},{status:400})
        }

        //중복 검사
        const post = await getPostById(id) as RowDataPacket[];

        if(post.length !== 0){
            return NextResponse.json({message:"Post Already Exists",isSuccess:false},{status:400})
        }


        //작성 시간 설정
        const date = new Date();

        //DB 저장
        const _response = await uploadPost({
            id:id,
            author:userId,
            description:description,
            date:date
        });

        if(_response){
            return NextResponse.json({message:"Post Uploaded",isSuccess:true},{status:200})
        }
        else{
            return NextResponse.json({message:"Post Upload Failed",isSuccess:false},{status:400})
        }

    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}