import { NextRequest, NextResponse } from 'next/server';
import { 
    generateToken,
    createUser
   } from "@/app/lib/UserData/UserDB";
import { cookies } from "next/headers";
import {getUserInfoAndPostByName} from "@/app/lib/UserData/UserDB";

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    /* body schema :{
        data:{
            id:string,
            name:string,
            avatar_url:string,
            email:string
        }
    }  
    */
    const userData = await request.json();

    if(!userData.id||!userData.email || !userData.name || !userData.avatar_url){
        return NextResponse.json({ message: "Need User Data" }, { status: 400 });
    }

    const user = await getUserInfoAndPostByName(userData.name);

    const token = await generateToken(userData.name);


    if(Array.isArray(user) && user.length === 0){
        await createUser(
            userData.id,
            userData.name,
            token,
            userData.avatar_url,
            userData.email
        )
    }
    
    return NextResponse.json({ message: "User Updated", user: userData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};