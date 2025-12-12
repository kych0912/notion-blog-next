import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export const config = {
  matcher: [
    "/write",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

async function proxy(request: NextRequest) {
  const session = await auth();

  // 인증이 필요한 경로 정의
  const protectedPaths = ["/write"];
  const { pathname } = request.nextUrl;

  // 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 보호된 경로이고 인증되지 않은 경우
  if (isProtectedPath && !session) {
    const signInUrl = new URL("/api/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 인증된 사용자는 통과
  return NextResponse.next();
}

export default proxy;
export { proxy as middleware };
