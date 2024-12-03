import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "./utils/tools";

type Modulos = "home" | "users" | "templates";

const routes: Record<Modulos, RegExp[]> = {
    home: [/^\/home/],
    users: [/^\/users/],
    templates: [/^\/templates/],
};

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token') || null;

    if (token) {
        try {
            const verifyToken = await verifyJWT(token.value);
            if (verifyToken) {
                return NextResponse.next();
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/auth", request.nextUrl));
        }
    }

    const pathname = request.nextUrl.pathname;

    for (const module in routes) {
        if (routes[module as Modulos].some((route) => route.test(pathname))) {
            return NextResponse.redirect(new URL("/auth", request.nextUrl));
        }
    }

    return NextResponse.next();
}
