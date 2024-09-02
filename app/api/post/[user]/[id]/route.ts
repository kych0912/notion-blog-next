import {NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { getPostDetail } from '@/app/lib/postData/postDB';
import { getToken } from 'next-auth/jwt';
import { decode } from 'next-auth/jwt';

export async function GET(req:NextRequest, { params }: { params: { id: string, user:string } }){
    const id = params.id;
    const user = params.user;

    //secret 값 default 설정
    const secret = process.env.NEXTAUTH_SECRET || '';

    //header에서 encoded token을 가져옴
    const rawToken = req.headers.get('__Secure-next-auth.session-token');

    let isAuthor = false;

    try{
        const res = await getPostDetail(id,user);

        //포스트가 존재하지 않을 때
        if(!Array.isArray(res) || res.length === 0){
            return NextResponse.json({message:"Post Not Found",isSuccess:false},{status:404})
        }

        //토큰 유효성 검사
        if(!rawToken){
            return NextResponse.json({data:res,isAuthor:isAuthor},{status:200})
        }

        const decodedToken = await decode({token:rawToken,secret}); 

        console.log(decodedToken);
        console.log(rawToken);

        //토큰이 유효하지 않을 때
        if(!decodedToken){
            return NextResponse.json({data:res,isAuthor:isAuthor},{status:200})
        }
        
        if(decodedToken.name === user){
            isAuthor = true;
        }

        return NextResponse.json({data:res,isAuthor:isAuthor},{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}