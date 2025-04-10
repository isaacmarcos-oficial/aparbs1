import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Permitir acesso público a rotas específicas
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Redirecionar se o usuário estiver autenticado
  const isUserManagementRoute = req.nextUrl.pathname.startsWith("/dash/usuarios")

  const isAllowed =
    token?.role === "admin" || token?.role === "superAdmin"

  if (isUserManagementRoute && !isAllowed) {
    return NextResponse.redirect(new URL("/dash", req.url))
  }

  // Redirecionar se o usuário não estiver autenticado
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}