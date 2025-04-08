import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/footer";

export default function SiteLayout({
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
