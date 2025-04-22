import { LinkIcons } from "@/components/linkIcons";
import Image from "next/image";
import LinkBio from "./_components/linkBio";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import MercadoLivreLogo from "./_components/mercadoLivreLogo";
import TowTruck from "./_components/towTruck";

export default function Bio() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[url(/Fachada.jpg)] bg-no-repeat bg-cover bg-[#000000e9] bg-blend-overlay px-6">
      <div className="flex items-center flex-col w-full max-w-lg bg-[#d90000] m-10 p-10 rounded-3xl">
        <div className="bg-white flex items-center justify-center p-2 rounded-full shadow-lg">
          <Image
            src="/Aparbs Light 3.svg"
            width={90}
            height={90}
            alt="logo da APARBS Soluções Automotivas"
            className="size-20 items-center justify-center"
          />
        </div>

        <div className="">
          <h1 className="text-2xl font-bold text-center text-secondary mt-4 tracking-wide">
            APARBS <br /> Soluções Automotivas
          </h1>
          <p className="w-full text-sm uppercase tracking-wide leading-5 text-white mt-3 text-center italic">
            O CENTRO AUTOMOTIVO QUE <br /> SEU CARRO SE SENTE SEGURO
          </p>
        </div>

        <div className="my-10">
          <LinkIcons theme="bgRed" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <LinkBio
            title="Fale conosco"
            iconLink={<FaWhatsapp />}
            adress="https://api.whatsapp.com/send?phone=553832208767&text=Olá%2C estou no site da APARBS. Gostaria de receber atendimento"
            target="_blank"
          />
          <LinkBio
            title="Loja Oficial - MERCADO LIVRE"
            iconLink={<MercadoLivreLogo className="w-6 h-6 " />}
            adress="https://www.mercadolivre.com.br/loja/aparbs"
            target="_blank"
          />

          <LinkBio
            title="APARBS Transportes"
            iconLink={<TowTruck className="w-6 h-6" />}
            adress="https://api.whatsapp.com/send?phone=5538999944889&text=Olá%2C estou no site da APARBS. Gostaria de receber atendimento"
            target="_blank"
          />

          <LinkBio
            title="Encontre-nos"
            iconLink={<MapPin />}
            adress="https://www.google.com/maps/dir//aparbs+porteirinha/@-15.755457,-43.0466363,14.17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x752281b048ee24b:0x8ce9b567298b1724!2m2!1d-43.0311318!2d-15.7536274?hl=pt-br"
            target="_blank"
          />

          <LinkBio
            title="Trabalhe conosco"
            iconLink={<BriefcaseBusiness />}
            adress="/trabalhe-conosco"
            target="_blank"
          />
        </div>

        <Link
          href="/"
          className="my-10 text-secondary hover:text-primary font-semibold transition-all text-sm"
        >
          IR PARA O INÍCIO
        </Link>

      </div>
    </div>
  )
}