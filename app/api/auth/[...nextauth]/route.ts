import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRETS as string,
        }),
        ],
    secret: process.env.SECRET_KEY,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }