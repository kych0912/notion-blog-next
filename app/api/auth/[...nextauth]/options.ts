import GithubProvider from "next-auth/providers/github"
import { updateUser } from "@/app/services/user/user";
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
        async signIn({ user }: { user: User | AdapterUser }): Promise<boolean> {
            const { name, image } = user;
            if(!name || !image) return false;
            await updateUser(name,image);
            return true;
        },
    },
    
}

export { authOptions }