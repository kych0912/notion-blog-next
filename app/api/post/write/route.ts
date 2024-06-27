import {NextResponse, NextRequest} from 'next/server';
import { cookies } from 'next/headers';
import { getPage } from '@/app/lib/notion-api';
import { verifyToken } from '@/app/lib/jwt';
import * as Types from 'notion-types';
import { uploadPost,getPostById } from '@/app/lib/postData/postDB';
import { parsePageId } from 'notion-utils';
import { RowDataPacket } from 'mysql2';
import {getNotionPageContent} from '@/app/lib/notion-api';
import axios from 'axios';

export async function POST(req:NextRequest){
    const {notionUrl,description} = await req.json();
    const token = req.cookies.get("_vercel_jwt")?.value;

    const id = parsePageId(notionUrl);

    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://notion-blog-next-sigma.vercel.app',
        'Access-Control-Allow-Credentials': 'true',
      };

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
        
        //token expire 검사
        let decoded;
        try{
            decoded = verifyToken(token); // Pass the value of the token cookie
            if(typeof decoded === 'string'){
                return NextResponse.json({ message: 'Invalid Token', isSuccess: false}, { status: 401, headers: corsHeaders});
            }
        }
        catch (err){
            return NextResponse.json({ message: 'Invalid Token', isSuccess: false}, { status: 401, headers: corsHeaders});
        }

        const userData = await axios.get('https://api.github.com/user',{
          headers: {
            authorization: `token ${decoded.id}`, 
          }
        })

        const userId = userData.data.name;
        const avatar = userData.data.avatar_url;

        //노션 링크 유효성 검사
        let recordMap:Types.ExtendedRecordMap;
        try{
            recordMap = await getPage(id);
        }
        catch(err){
            return NextResponse.json({message:"Invalid Notion URL",isSuccess:false},{status:400,headers:corsHeaders})
        }

        //중복 검사
        const post = await getPostById(id) as RowDataPacket[];

        if(post.length !== 0){
            return NextResponse.json({message:"Post Already Exists",isSuccess:false},{status:400,headers:corsHeaders})
        }


        //작성 시간 설정
        const date = new Date();

        //노션 페이지 컨텐츠 획득
        const notionContent = await getNotionPageContent(id);

        //DB 저장
        const _response = await uploadPost({
            id:id,
            author:userId,
            description:description,
            date:date,
            image:notionContent.image,
            title:notionContent.title,
            avatar:avatar,
        });

        if(_response){
            return NextResponse.json({message:"Post Uploaded",isSuccess:true},{status:200,headers:corsHeaders})
        }
        else{
            return NextResponse.json({message:"Post Upload Failed",isSuccess:false},{status:400,headers:corsHeaders})
        }

    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500,headers:corsHeaders})
    }
}