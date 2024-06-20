import { NextRequest, NextResponse } from 'next/server';
import { generateToken, createUser, getUserInfo } from "@/app/lib/UserData/UserDB";
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
      client_id: process.env.CLIENT_ID || '',
      client_secret: process.env.CLIENT_SECRET || '',
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

    const userData = await axios.get('https://api.github.com/user', {
      headers: {
        authorization: `token ${id}`,
      },
    });

    const token = await generateToken(id);

    const user = await getUserInfo(userData.data.name);
    if (Array.isArray(user) && user.length === 0) {
      await createUser(
        userData.data.name,
        token,
        userData.data.avatar_url
      );
    }

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);

    const response = NextResponse.json(json, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://notion-blog-next-j6nbqb54s-kych0912s-projects.vercel.app',
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    response.headers.append(
      'Set-Cookie',
      `x_auth=${token}; Path=/; Expires=${expires.toUTCString()}; SameSite=None; Secure; HttpOnly`
    );

    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}