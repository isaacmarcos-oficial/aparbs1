import { Sidebar, SidebarContent } from "../ui/sidebar";
import Image from "next/image";
import SidebarList from "./sidebarList";

export default function MainSidebar() {
  return (
    <Sidebar className="bg-[#d90000]">
      <SidebarContent className="flex w-full items-center text-white bg-[#d90000] p-4 border-r-4 border-r-red-900">
        <div className="items-center justify-center mt-16">
          <Image
            width={150}
            height={100}
            src="/Aparbs Dark 3.svg"
            alt="APARBS Soluções Automotivas" />
        </div>
        <div className="w-full mt-6">
          <SidebarList/>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}