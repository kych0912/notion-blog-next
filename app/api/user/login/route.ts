import { NextResponse, NextRequest } from "next/server";
import { 
  findUserByName,
  comparePassword,
  generateToken
 } from "@/app/lib/UserData/UserDB";
 import { cookies } from "next/headers";

export async function POST(req:NextRequest) {
  const userData:UserLogin = await req.json();

  try{
    const user = await findUserByName(userData.id);

    if (user) {
      const id = user.id;
      const password = user.password;

      const isMatch = await comparePassword(userData.password, password);

      if (!isMatch) {
        return NextResponse.json({ message: "Invalid Credentials" },{status:401});
      }

      const token = await generateToken(id);

      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);

      cookies().set("x_auth", token,{
        expires,
        path: "/",
        sameSite: "strict",
        secure: true,
        httpOnly: true
      });
      return NextResponse.json({ message: "Login Success",isSuccess:true},{status:200});
    }
    else{
      return NextResponse.json({ message: "Invalid Credentials" },{status:401});
    }
  }
  catch(err)
  {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}