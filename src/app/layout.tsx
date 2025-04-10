import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "./providers/sessionProvider";

export const metadata: Metadata = {
  title: "APARBS Soluções Automotivas",
  description: "Há mais de 25 no mercado atendendo com qualidade, garantindo eficiência em serviços automotivos em Porteirinha/MG. Mecânica, elétrica automotiva, ar condicionado, injeção eletrônica, guincho, peças e serviços de manutenção.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="">
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
