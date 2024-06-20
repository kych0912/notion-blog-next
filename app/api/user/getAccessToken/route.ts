import { NextRequest, NextResponse } from 'next/server';
import { 
    generateToken,
    createUser
   } from "@/app/lib/UserData/UserDB";
import { cookies } from "next/headers";
import {getUserInfo} from "@/app/lib/UserData/UserDB";
import axios from 'axios';

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const requestUrl = new URL(request.nextUrl);
    const code = requestUrl.searchParams.get('code');

    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
      client_id: process.env.CLIENT_ID || '',
      client_secret: process.env.CLIENT_SECRETS || '',
      code: code || '',
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const data = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    const json = await data.json();

    const id = json.access_token;

    const userData = await axios.get('https://api.github.com/user',{
        headers: {
          authorization: `token ${id}`, 
        }
    })

    const token = await generateToken(id);

    const user = await getUserInfo(userData.data.name)
    console.log(user);
    if(Array.isArray(user) && user.length === 0){
        await createUser(
            userData.data.name,
            token,
            userData.data.avatar_url
        )
    }


    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);

    cookies().set("x_auth", token,{
      expires,
      path: "/",
      sameSite: "strict",
      secure: true,
      httpOnly: true
    });

    return new NextResponse(JSON.stringify(json), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};