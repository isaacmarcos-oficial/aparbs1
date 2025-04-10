import { NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/auth";

export function middleware(req: NextRequest) {
  return authMiddleware(req); // Reutilizando o middleware de autenticação
}

// Configurar os matchers para as rotas protegidas
export const config = {
  matcher: ["/dash/:path*"],
};