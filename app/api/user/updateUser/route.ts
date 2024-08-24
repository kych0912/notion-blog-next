import { NextRequest, NextResponse } from 'next/server';
import { 
    generateToken,
    createUser
   } from "@/app/lib/UserData/UserDB";
import { cookies } from "next/headers";
import {getUserInfo} from "@/app/lib/UserData/UserDB";

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    /* body schema :{
        data:{
            name:string,
            avatar_url:string
        }
    }  
    */
    const userData = await request.json();

    console.log(userData.name);

    if(!userData){
        return NextResponse.json({ message: "Need User Data" }, { status: 400 });
    }

    const user = await getUserInfo(userData.name);

    const token = await generateToken(userData.name);

    if(Array.isArray(user) && user.length === 0){
        await createUser(
            userData.name,
            token,
            userData.avatar_url
        )
    }
    
    return NextResponse.json({ message: "User Updated", user: userData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};