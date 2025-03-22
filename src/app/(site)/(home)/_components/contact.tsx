import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LinkIcons } from "@/components/linkIcons";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex max-w-screen-xl h-full w-full max-h-[400px] lg:max-h-[600px] rounded">
        <div className="w-full max-w-2/3 flex h-full items-center justify-center flex-col p-8 bg-[#d90000]">
          <div className="flex flex-col items-center justify-center mb-10">
            <h2 className="mb-4 text-primary-foreground font-black text-3xl">
              <a href="#faleconosco">FALE CONOSCO</a>
            </h2>

            <div className="flex mb-2 gap-4">
              <LinkIcons theme="bgRed" />
            </div>
            <Link href="tel:+553832208767" className="text no-underline" >
              <p className="text-primary-foreground hover:text-primary transition-all font-bold text-lg lg:text-2xl">
                (38) 3220-8767
              </p>
            </Link>
          </div>

          <div className="flex flex-col w-full max-w-96 ">
            <h2 className="mb-4 text-primary-foreground font-black text-3xl text-center">
              VISITE-NOS
            </h2>

            <Link
              href="https://www.google.com/maps/dir//aparbs+porteirinha/@-15.755457,-43.0466363,14.17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x752281b048ee24b:0x8ce9b567298b1724!2m2!1d-43.0311318!2d-15.7536274?hl=pt-br"
              className="no-underline"
              target="_blank"
            >
              <Button className="bg-primary-foreground hover:bg-primary-foreground hover:text-primary w-full mb-2 text-[#d90000] transition-all">
                <FaMapMarkerAlt />
                <p className="text-xs lg:text-base font-bold">
                  APARBS Porteirinha/MG
                </p>
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-1/3 hidden md:block h-full relative">
          <Image
            width={500}
            height={500}
            loading="lazy"
            quality={50}
            src="/Camada 2.jpg"
            alt="Alaelton Vieira, Alaídes Vieira, Arthur Vieira e Aldiney Vieira, diretores da oficina mecânica APARBS Soluções Automotivas de Porteirinha/MG e Riacho dos Machados/MG"
            style={{ objectFit: "cover", objectPosition: "80% top" }}
          />
        </div>
      </div>
    </div>
  );
}