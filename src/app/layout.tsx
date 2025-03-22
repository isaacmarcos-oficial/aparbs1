import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/footer";

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
      <body className="">
        <SidebarProvider>
          <div className="flex flex-col w-full">
            <Header />
            <div className="flex flex-col mt-16 w-full">
              {children}
            </div>
            <Footer />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
