import { getToken } from 'next-auth/jwt';
import {
    NextMiddlewareWithAuth,
    NextRequestWithAuth,
} from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export function verifyUser(
    middleware: NextMiddlewareWithAuth,
): NextMiddlewareWithAuth {
    return async (request: NextRequestWithAuth, event: NextFetchEvent) => {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (token === null) {
            const redirectPath = `${ process.env.NEXTAUTH_URL}/login`;
            return NextResponse.redirect(redirectPath);
        }
        return middleware(request, event);
    }

}