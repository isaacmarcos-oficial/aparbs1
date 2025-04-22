import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import SidebarList from "@/components/Sidebar/sidebarList";
import Image from "next/image";

export function SidebarMenu() {
  return (
    <SheetContent side="left" className="p-4 flex flex-col w-[300px] h-screen bg-[#d90000] text-zinc-50 border-none shadow-lg border-r-4 border-r-red-900">
      <SheetHeader className="items-center justify-center mt-16">
        <Image
          width={150}
          height={100}
          src="/Aparbs Dark 3.svg"
          alt="APARBS Soluções Automotivas" />
        <SheetTitle className="sr-only">Menu</SheetTitle>
      </SheetHeader>

      <div className="w-full mt-6">
        <SidebarList />
      </div>
    </SheetContent>
  )
}