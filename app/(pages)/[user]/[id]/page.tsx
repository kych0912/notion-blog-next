import DetailContent from "./_components/DetailContent";
import { cookies } from "next/headers";

async function Page({params}: {params:{id:string,user:string }}) {    
    const cookieStore = cookies();
    const token = cookieStore.get(process.env.NEXTAUTH_COOKIE_NAME as string)?.value ?? '';
    const id = params.id;
    const user = params.user;

    return (
        <DetailContent 
            id={id} 
            user={user} 
            token={token}
        />
    );
}

export default Page;