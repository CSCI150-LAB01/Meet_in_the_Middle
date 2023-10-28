import { getToken } from "next-auth/jwt";
import { NextMiddlewareWithAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";

export function verifyAuth(middleware: NextMiddlewareWithAuth): NextMiddlewareWithAuth {
  return async (request: NextRequestWithAuth, event: NextFetchEvent) => {
    // If pages are user authorization or registration pages.

    // returns token from /config/NextAuth.js
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const search = request.nextUrl.search.replace('?', '').split('&').map((param) => {
      const [key, value] = param.split('=');
      return { [key]: decodeURIComponent(value) };
    });

    const callbackUrl = search.find((param) => param.callbackUrl)?.callbackUrl;

    // redirect users if loged in
    if (token !== null) {
      const redirectPath = callbackUrl ? `${process.env.NEXTAUTH_URL}${callbackUrl}` : `${process.env.NEXTAUTH_URL}/home`;
      return NextResponse.redirect(redirectPath);
    }

    // redirect users if not loged in
    return middleware(request, event);
  }
}