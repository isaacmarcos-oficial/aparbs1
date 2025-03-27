import Link from "next/link";
import { SidebarMenuButton } from "../ui/sidebar";
import { BriefcaseBusiness, Caravan, Home, Link2, MapPinned, Newspaper } from "lucide-react";

const menuItems = [
  {
    title: "Início",
    icon: Home,
    url: "/",
    target: "_self",   
  },
  {
    title: "Blog",
    icon: Newspaper,
    url: "/blog",
    target: "_self",
  },
  {
    title: "Chame o guincho",
    icon: Caravan,
    url:"https://api.whatsapp.com/send?phone=5538999944889&text=Ol%C3%A1%2C%20estou%20no%20site%20da%20APARBS.%20Gostaria%20de%20receber%20atendimento",
    target: "_blank",
  },
  {
    title: "Localização",
    icon: MapPinned,
    url: "https://www.google.com/maps/dir//aparbs+porteirinha/@-15.755457,-43.0466363,14.17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x752281b048ee24b:0x8ce9b567298b1724!2m2!1d-43.0311318!2d-15.7536274?hl=pt-br",
    target: "_blank",
  },
  {
    title: "Trabalhe conosco",
    icon: BriefcaseBusiness,
    url: "/trabalhe-conosco",
    target: "_blank",
  },
  {
    title: "Links rápidos",
    icon: Link2,
    url: "/bio",
    target: "_self",
  }
]

export default function SidebarList() {
  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <Link key={item.title} href={item.url} target={item.target}>
          <SidebarMenuButton>
            <item.icon />
            {item.title}
          </SidebarMenuButton>
        </Link>
      ))}
    </div>
  )
}