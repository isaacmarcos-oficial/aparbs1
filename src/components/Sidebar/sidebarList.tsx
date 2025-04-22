import Link from "next/link";
import { SidebarMenuButton } from "../ui/sidebar";
import { BriefcaseBusiness, Home, Link2, MapPinned, Newspaper } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import MercadoLivreLogo from "@/app/bio/_components/mercadoLivreLogo";
import TowTruck from "@/app/bio/_components/towTruck";

export default function SidebarList() {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/">
        <SidebarMenuButton>
          <Home />
          Início
        </SidebarMenuButton>
      </Link>

      <Link href="/blog">
        <SidebarMenuButton>
          <Newspaper />
          Blog
        </SidebarMenuButton>
      </Link>

      <Link href="https://www.mercadolivre.com.br/loja/aparbs" target="_blank">
        <SidebarMenuButton>
          <MercadoLivreLogo className="w-6 h-6 " />
          Loja Oficial - MERCADO LIVRE
        </SidebarMenuButton>
      </Link>

      <Link href="https://api.whatsapp.com/send?phone=5538999944889&text=Olá%2C estou no site da APARBS. Gostaria de receber atendimento" target="_blank">
        <SidebarMenuButton>
          <TowTruck className="w-6 h-6" />
          Chame o guincho
        </SidebarMenuButton>
      </Link>

      <Link href="https://api.whatsapp.com/send?phone=5538999944889&text=Olá%2C estou no site da APARBS. Gostaria de receber atendimento" target="_blank">
        <SidebarMenuButton>
          <MapPinned className="w-6 h-6" />
          Localização
        </SidebarMenuButton>
      </Link>

      <Link href="/trabalhe-conosco">
        <SidebarMenuButton>
          <BriefcaseBusiness className="w-6 h-6" />
          Trabalhe conosco
        </SidebarMenuButton>
      </Link>

      <Link href="https://api.whatsapp.com/send?phone=553832208767&text=Olá%2C estou no site da APARBS. Gostaria de receber atendimento">
        <SidebarMenuButton>
          <FaWhatsapp />
          Fale conosco
        </SidebarMenuButton>
      </Link>

      <Link href="/bio" target="_blank">
        <SidebarMenuButton>
          <Link2 />
          Links rápidos
        </SidebarMenuButton>
      </Link>
    </div>
  )
}