// middleware.js
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    
    // 사용자 정의 헤더 설정
    requestHeaders.set('access-control-allow-headers', 'next-auth.session-token');

    // NextResponse 객체 생성
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // /write 경로에서만 토큰 확인
    if (request.nextUrl.pathname === '/write') {
        const token = await getToken({ req: request });

        if (!token && process.env.NEXTAUTH_URL) {
            // 인증되지 않은 경우 리다이렉트
            return NextResponse.redirect(process.env.NEXTAUTH_URL);
        }
    }

    return response; // 수정된 요청 헤더와 함께 응답 반환
}

// 모든 경로에 대해 미들웨어 적용
export const config = {
    matcher: ['/', '/write'],
};
