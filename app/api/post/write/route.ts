import {NextResponse, NextRequest} from 'next/server';
import { getPage } from '@/app/lib/notion-api';
import * as Types from 'notion-types';
import { uploadPost,getPostById } from '@/app/lib/postData/postDB';
import { parsePageId } from 'notion-utils';
import { RowDataPacket } from 'mysql2';
import {getNotionPageContent} from '@/app/lib/notion-api';
import { getToken } from 'next-auth/jwt';

export async function POST(req:NextRequest){
    const {notionUrl} = await req.json();
    const token = await getToken({req});

    const id = parsePageId(notionUrl);

    try{
        //notionUrl,description 유효성 검사
        if(!id){
            return NextResponse.json({message:"Invalid Notion URL",isSuccess:false},{status:400})
        }

        //토큰 유효성 검사
        if (!token) {
            return NextResponse.json({ message: 'Token Not Found', isSuccess: false}, { status: 401 });
        }

        const userId = token.name;
        const avatar = token.picture;

        if(!userId || !avatar){
            return NextResponse.json({ message: 'Invalid Token', isSuccess: false}, { status: 401 });
        }

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
            return NextResponse.json({message:"Post Already Exists",isSuccess:false},{status:409})
        }


        //작성 시간 설정
        const date = new Date();

        //노션 페이지 컨텐츠 획득
        const notionContent = await getNotionPageContent(id);

        //DB 저장
        await uploadPost({
            id:id,
            author:userId,
            date:date,
            image:notionContent.image,
            title:notionContent.title,
            avatar:avatar,
        });
        
        return NextResponse.json({message:"Post Uploaded",isSuccess:true},{status:200})

    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}