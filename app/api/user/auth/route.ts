import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/jwt';

export async function GET(req: Request) {

  const token = await cookies().get('x_auth');

    try {
        console.log(token)

        if (typeof token === 'undefined') {
            return NextResponse.json({ message: 'Token Not Found', status: 401, isLogged: false});
        }
    
        const decoded = verifyToken(token.value); // Pass the value of the token cookie

        if (decoded) {
            return NextResponse.json({ message: 'Token Verified', status: 200, isLogged: true});
        } else {
            return NextResponse.json({ message: 'Invalid Token', status: 401, isLogged: false});
        }

    } 
  catch (err) {
    return NextResponse.json({ message: 'Server Error' });
  }
}