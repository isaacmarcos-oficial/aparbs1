import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LinkIcons } from "./linkIcons";
import MainSidebar from "./Sidebar/mainSidebar";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <div className="fixed flex top-0 items-center justify-center h-16 w-full bg-[#d90000] z-50">
      <MainSidebar />
      <div className="grid grid-cols-3 max-w-screen-xl w-full lg:mx-0 mx-8">
        <SidebarTrigger className="h-10 w-10" />

        <div className="flex items-center justify-end md:justify-center">
          <Link href="/">
            <Image
              width={150}
              height={150}
              src="/Aparbs Dark 10.svg"
              alt="logo da APARBS Soluções Automotivas" />
          </Link>
        </div>

        <div className="md:flex items-center justify-end hidden">
          <LinkIcons theme="bgRed" />
        </div>
      </div>
    </div>
  );
}