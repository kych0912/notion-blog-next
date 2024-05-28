import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const hasCookie = cookies.get('x_auth');

  if (!hasCookie && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }
  if (hasCookie && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/', request.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};