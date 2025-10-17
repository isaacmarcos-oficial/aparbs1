"use client"

import * as React from "react"
import {
  Car,
  Home,
  ShoppingBag,
  SquareArrowUpRight,
  Target,
  Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useSession } from "next-auth/react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inicio",
      url: "/dash",
      icon: Home,
    },
    {
      title: "Campanhas",
      url: "/dash/campanhas",
      icon: Target,
    },

    {
      title: "Transportes",
      url: "/dash/transportes",
      icon: Car
    },
    {
      title: "Catálogo",
      url: "/dash/catalogo",
      icon: ShoppingBag
    },
    {
      title: "Usuários",
      url: "/dash/usuarios",
      icon: Users
    },
  ],
  navSecondary: [
    {
      title: "Ir para o site",
      url: "/",
      icon: SquareArrowUpRight,
    },
  ],
}


export function DashSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const user = {
    name: session?.user?.name ?? "Usuário",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "/default-avatar.png",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex items-center justify-center bg-[#d90000] h-20 hover:bg-[#d90000]"
            >
              <a href="/dash">
                <Image
                  src="/Aparbs Dark 10.svg"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="h-35 w-35"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
