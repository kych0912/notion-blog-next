import NextAuth from "next-auth"
import { authOptions } from "../../post/[user]/[id]/options"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }