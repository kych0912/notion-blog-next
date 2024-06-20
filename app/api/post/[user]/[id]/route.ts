import {NextRequest} from 'next/server';
import { getPostDetail } from '@/app/lib/postData/postDB';
import { verifyToken } from '@/app/lib/jwt';
import { headers } from 'next/headers';
import axios from 'axios';

export async function GET(req:NextRequest , { params }: { params: { id: string, user:string } }){
    try{
        const id = params.id;
        const user = params.user;

        const headersList = headers();
        const token = headersList.get('x_auth');

        let isAuthor = false;

        if (token) {
            try {
                const decoded = verifyToken(token);
                if (typeof decoded !== 'string') {

                    const userData = await axios.get('https://api.github.com/user',{
                        headers: {
                          authorization: `token ${decoded.id}`, 
                        }
                      })

                    if(userData.data.name === user){
                        isAuthor = true;
                    }
                    
                    else{
                        isAuthor = false;
                    }
                }
            } catch (err) {
                isAuthor = false; // Token is invalid or expired
            }
        }

        const res = await getPostDetail(id,user);

        if(!Array.isArray(res) || res.length === 0){
            return NextResponse.json({message:"Post Not Found",isSuccess:false},{status:404})
        }
        return NextResponse.json({data:res,isAuthor:isAuthor},{status:200})
    }
    catch(err){
        return NextResponse.json({message:"Internal Server Error",isSuccess:false},{status:500})
    }
}