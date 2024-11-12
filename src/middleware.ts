import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API } from './utils/constant';

const privatePaths = ['/admin'];
export async function middleware(request: NextRequest) {
  const isAuth = Boolean(request.cookies.get('access_token')?.value);
  const { pathname } = request.nextUrl;
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  // check role and permission
  const checkData = await fetch(`${API.ROLE}/check-role`, {
    headers: {
      Authorization: `Bearer ${request.cookies.get('access_token')?.value}`,
    },
  });
  const data = await checkData.json();

  if (
    (privatePaths.some((path) => pathname.startsWith(path)) &&
      data.name_method == 'User') ||
    data.permission == null
  ) {
    // return home
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/admin/:path*'],
};
