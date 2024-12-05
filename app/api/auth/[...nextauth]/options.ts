import GithubProvider from "next-auth/providers/github"
import { getUserInfoAndPostByName, getUserInfoById, updateUser } from "@/app/services/user/user";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRETS as string,
        }),
        ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    callbacks:{
        async signIn({ user }: { user: User | AdapterUser }): Promise<boolean | string> {
            const { id ,name, image, email } = user;

            try{
                const _UserInfo = await getUserInfoById(id);
                            
                if(Array.isArray(_UserInfo) && _UserInfo.length > 0){
                    return true;
                }
            }
            catch(err:any){
                if(err.response?.status === 404){
                   
                }
            }

            if (!email) {
                return '/auth/error?error=EmailRequired';  // 이메일이 없을 경우 에러 페이지로 리다이렉트
            }
            
            if (!name || !image) {
                return '/auth/error?error=InvalidProfile';  // 이름이나 이미지가 없을 경우
            }

            try {
                await updateUser(id,name, image, email);
                return true;
            } catch (error) {
                return '/auth/error?error=DatabaseError';  // DB 업데이트 실패 시
            }
        },
    },
    
}

export { authOptions }