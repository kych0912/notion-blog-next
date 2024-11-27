import DetailContent from "./_components/DetailContent";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

async function Page({params}: {params:{id:string,user:string }}) {    
    const cookieStore = cookies();
    const token = cookieStore.get(process.env.NEXTAUTH_COOKIE_NAME as string)?.value ?? '';

    return (
        <DetailContent 
            id={params.id} 
            user={params.user} 
            token={token}
        />
    );
}

export default Page;