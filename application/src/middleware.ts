
import { NextRequestWithAuth } from "next-auth/middleware";
import { AuthRoutes, } from "./config/Routes";
import { NextFetchEvent } from "next/server";
import { factory } from "./middleware/factory";
import { verifyAuth } from "./middleware/verifyAuth";
import { verifyUser } from "./middleware/verifyUser";

export async function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
    const isAuth = AuthRoutes.includes(request.nextUrl.pathname);

    if (isAuth) {
        // If pages are user authorization or registration pages.
        // return factory([verifyAuth])(request, event);

    } else {
        // If pages are private pages.
        // return factory([verifyUser])(request, event);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}