import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/write"] };

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });

	console.log(token);

	if (!token && process.env.NEXTAUTH_URL) {
		return NextResponse.redirect(process.env.NEXTAUTH_URL);
	}
}