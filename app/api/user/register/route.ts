import { NextResponse } from "next/server";
import { 
    createUser,
    findUserByName,
   } from "@/app/lib/UserData/UserDB";
   import { cookies } from "next/headers";
  

async function isUserExist(id:string){
    const user = await findUserByName(id);

    if(user){
        return true;
    }

    return false;
}

export async function POST(req:Request) {
    const userData = await req.json();

    const id = userData.id;
    const password = userData.password;

    try{
        const isExist = await isUserExist(id);

        if(isExist){
            return NextResponse.json({ message: "User Already Exists"},{status: 400});
        }

        const _response = await createUser(id,password);

        if (_response) {
            return NextResponse.json({ message: "User Created", status: 200});
        }
        else{
            return NextResponse.json({ message: "User Creation Failed", status: 500});
        }
    }
    catch(err)
    {
        return NextResponse.json({ message: "Server Error" });
    }
}