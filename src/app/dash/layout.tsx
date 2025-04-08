import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { DashSidebar } from "./_components/dashSidebar";

export default function DashLayout({
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
          <DashSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <Card className="flex flex-1 flex-col m-6 p-4">
              {children}
            </Card>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
