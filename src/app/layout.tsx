import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "./providers/sessionProvider";
import PinterestTag from "@/scripts/pinterest";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "APARBS Soluções Automotivas",
  description: "Há mais de 25 no mercado atendendo com qualidade, garantindo eficiência em serviços automotivos em Porteirinha/MG.",
  keywords: [
    "oficina mecânica Porteirinha",
    "guincho 24h Porteirinha",
    "injeção eletrônica Porteirinha",
    "mecânica automotiva MG",
    "APARBS Soluções Automotivas",
    "Locação aluguel de Veículos",
    "Alinhamento, balanceamento, cambagem e ajuste de direção",
  ],
  openGraph: {
    title: "APARBS Soluções Automotivas | Mecânica e Guincho em Porteirinha, MG",
    description:
      "Há mais de 25 anos oferecendo manutenção automotiva completa em Porteirinha/MG. Mecânica, elétrica, ar-condicionado, guincho e mais.",
    url: "https://aparbs.com.br",
    siteName: "APARBS Soluções Automotivas",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://aparbs.com.br/images/oficina-aparbs.jpg",
        width: 1200,
        height: 630,
        alt: "APARBS Soluções Automotivas - Oficina em Porteirinha, MG",
      },
    ],
  },
  alternates: {
    canonical: "https://aparbs.com.br",
  },
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://aparbs.com.br"),
  
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
        <meta name="p:domain_verify" content="a24bcf3aa1f4022da19ed07711a44925"/>
        <PinterestTag />
        <GoogleAnalytics gaId="G-WJ87825878" />
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
