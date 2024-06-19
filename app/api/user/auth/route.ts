import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/jwt';

export async function GET(req: Request) {

  const token = await cookies().get('x_auth');

    try {
        if (typeof token === 'undefined') {
            return NextResponse.json({ message: 'Token Not Found', isLogged: false}, { status: 401 });
        }
        
        const decoded = verifyToken(token.value); // Pass the value of the token cookie

        if (decoded) {
            return NextResponse.json({ message: 'Token Verified',id:decoded, isLogged: true}, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid Token', isLogged: false}, { status: 401 });
        }

    } 
  catch (err) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
} 