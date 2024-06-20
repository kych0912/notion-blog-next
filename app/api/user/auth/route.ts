import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/jwt';
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const token = req.cookies.get("_vercel_jwt");
    console.log(token)
    try {
        if (typeof token === 'undefined') {
            return NextResponse.json({ message: 'Token Not Found', isLogged: false}, { status: 401 });
        }
        
        const decoded = verifyToken(token.value); // Pass the value of the token cookie
        if(typeof decoded === 'string'){
            return NextResponse.json({ message: 'Invalid Token', isLogged: false}, { status: 401 });
        }

        const accessToken = decoded.id;  

        const userData = await axios.get('https://api.github.com/user',{
          headers: {
            authorization: `token ${accessToken}`, 
          }
        })

        if (userData) {
            return NextResponse.json({user:userData.data , message: 'Token Verified',id:decoded, isLogged: true}, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid Token', isLogged: false}, { status: 401 });
        }

    } 
  catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
} 