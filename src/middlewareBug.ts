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
    const pathname = request.nextUrl.pathname;

    // Si ya estamos en la página de login (/auth), no redirigir
    if (pathname === '/auth') {
        return NextResponse.next();
    }

    // Si el usuario tiene un token, verificamos que sea válido
    if (token) {
        try {
            const verifyToken = await verifyJWT(token.value);
            if (verifyToken) {
                return NextResponse.next(); // Token válido, continuar con la solicitud
            }
        } catch (error) {
            // Si el token no es válido o el proceso falla, redirigir al login
            console.log("Token inválido o error en verificación", error);
            return NextResponse.redirect(new URL("/auth", request.nextUrl));
        }
    }

    // Si no hay token o el token es inválido, redirigir a /auth solo en las rutas protegidas
    for (const module in routes) {
        if (routes[module as Modulos].some((route) => route.test(pathname))) {
            return NextResponse.redirect(new URL("/auth", request.nextUrl));
        }
    }

    // Si la ruta no requiere autenticación, permitir el acceso
    return NextResponse.next();
}
