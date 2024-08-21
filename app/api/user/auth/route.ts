import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/jwt';
import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {

  const token = await cookies().get('x_auth');
 
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

        const bodyUserData = {
          name:userData.data?.name,
          avatar_url:userData.data?.avatar_url,
        }

        if (userData) {
            return NextResponse.json({user:bodyUserData , message: 'Token Verified',id:decoded, isLogged: true}, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid Token', isLogged: false}, { status: 401 });
        }

    } 
  catch (err) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
} 