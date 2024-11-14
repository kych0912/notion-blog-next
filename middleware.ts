import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/write"] };

export async function middleware(request: NextRequest) {
	const token = await getToken({ 
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
		secureCookie: true && process.env.NODE_ENV === "production"
	});

	if (!token && process.env.NEXTAUTH_URL) {
		return NextResponse.redirect(process.env.NEXTAUTH_URL);
	}
}