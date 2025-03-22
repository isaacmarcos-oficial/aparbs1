import { RiOilFill } from "react-icons/ri";
import {
  FaCouch,
  FaCarBattery,
  FaRegSnowflake,
  FaBolt,
  FaMicrochip,
  FaSprayCan,
  FaWrench,
} from "react-icons/fa";
import { BsTruckFlatbed } from "react-icons/bs";
import { arCondicionado, autoPecas, autoSocorro, eletrica, injecao, limpezaBico, mecanicaGeral, salaEspera, trocaOleo } from "./officesList";
import Image from "next/image";
import OfficeModal from "./officeModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Offices() {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="max-w-screen-xl">
        <div className="w-full  px-4 lg:px-0 flex-col items-center justify-center">
          <h2 className="text-[#d90000] mb-8 text-center text-3xl font-black">
            <a href="#NossosServicos">Nossos Serviços</a>
          </h2>
        </div>

        <div className="flex gap-5 px-4 md:px-8 lg:px-0 w-full">
          <div className="grid w-full gap-6 grid-cols-1 md:grid-cols-2">
            <OfficeModal
              serviceIcon={<FaWrench />}
              title="Mecânica em Geral"
              description="Da troca de peças à reparação complexa."
              checklist={mecanicaGeral}
            />
            <OfficeModal
              serviceIcon={<FaRegSnowflake />}
              title="Ar Condicionado"
              description="Ar condicionado é mais do que um luxo, é uma necessidade."
              checklist={arCondicionado}
            />
            <OfficeModal
              serviceIcon={<FaBolt />}
              title="Elétrica Automotiva"
              description="Problemas elétricos podem ser desafiadores, mas é nossa perícia."
              checklist={eletrica}
            />
            <OfficeModal
              serviceIcon={<FaMicrochip />}
              title="Injeção Eletrônica"
              description="O coração do seu carro merece cuidado especial."
              checklist={injecao}
            />
            <OfficeModal
              serviceIcon={<RiOilFill />}
              title="Troca de Óleo"
              description="Um motor saudável começa com um óleo saudável."
              checklist={trocaOleo}
            />
            <OfficeModal
              serviceIcon={<FaSprayCan />}
              title="Limpeza de Bico"
              description="Bicos entupidos podem comprometer o desempenho do seu veículo."
              checklist={limpezaBico}
            />
            <OfficeModal
              serviceIcon={<BsTruckFlatbed />}
              title="Auto Socorro"
              description="Nosso serviço de guincho 24h garante que você não fique na estrada."
              checklist={autoSocorro}
            />
            <OfficeModal
              serviceIcon={<FaCarBattery />}
              title="Peças e Baterias"
              description="Peças e baterias de alta qualidade são a espinha dorsal de nosso serviço."
              checklist={autoPecas}
            />
            <OfficeModal
              serviceIcon={<FaCouch />}
              title="Sala de espera"
              description="Enquanto cuidamos do seu veículo, relaxe em nossa acolhedora sala de espera."
              checklist={salaEspera}
            />
            <div className="w-full items-center justify-center">
              <Link
                href="https://api.whatsapp.com/send?phone=553832208767&text=Ol%C3%A1%2C%20estou%20no%20site%20da%20APARBS.%20Gostaria%20de%20receber%20atendimento"
                target="_blank"
                className="">
                <Button className="h-10 p-2 w-full items-center justify-center text-[#d90000] bg-primary-foreground hover:bg-[#d90000] hover:text-white border-2 border-[#d90000] rounded transition-all font-bold uppercase">
                  Faça o seu agendamento
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative w-3/6 hidden md:block">
            <Image
              width={500}
              height={500}
              src="/Arthur-Reception.webp"
              alt="Arthur Vieira, diretor financeiro da oficina APARBS Soluções Automotivas na cidade de Porteirinha/MG e Riacho dos Machados/MG"
              loading="lazy"
              style={{ objectFit: "contain", position: "relative" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}