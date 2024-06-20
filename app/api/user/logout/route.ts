import axios from 'axios';
import { NextRequest,NextResponse } from 'next/server';
import { cookies } from "next/headers";

export async function GET(req:NextRequest,res:NextResponse){
    try{
        const token = await cookies().get('_vercel_jwt');
        
        if (typeof token === 'undefined') {
            return NextResponse.json({ message: 'Token Not Found', isLogged: false}, {status: 401});
        }

        const response = NextResponse.json({ message: 'Logout Success', isLogged: false},{status: 200});
        response.cookies.set('_vercel_jwt', '', { path: '/', expires: new Date(0) });

        return response;
    }
    catch(err){
        return NextResponse.json({ message: 'Server Error' }, {status: 500});
    }
}