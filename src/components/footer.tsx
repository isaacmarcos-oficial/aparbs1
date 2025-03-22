import Image from "next/image";
import { LinkIcons } from "./linkIcons";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex w-full flex-col mt-12 pt-12 items-center bg-zinc-950 text-primary-foreground font-light text-xs">
      <div className="grid justify-center grid-cols-1 md:grid-cols-4 max-w-screen-xl w-full mb-10 px-8 md:px-4 lg:px-0 gap-8 md:gap-0">
        {/* Serviços */}
        <div className="flex flex-col leading-7">
          <h3 className="text-xl mb-1 text-[#d90000] font-bold">
            Nossos Serviços
          </h3>
          <p>Mecânica em Geral</p>
          <p>Elétrica Automotiva</p>
          <p>Troca de Óleo</p>
          <p>Auto Socorro</p>
          <p>Ar Condicionado</p>
          <p>Injeção Eletrônica</p>
          <p>Limpeza de Bico</p>
          <p>Peças e Baterias</p>
        </div>

        {/* APARBS Porteirinha */}
        <div className="flex flex-col leading-7">
          <h3 className="text-xl mb-1 text-[#d90000] font-bold">
            Porteirinha/MG
          </h3>
          <p className="text-zinc-500 font-light">
            07.263.234/0001-70
          </p>
          <p>
            Av. Dalton Cunha, 201
            <br />
            Bairro Eldorado
            <br />
            Porteirinha/MG
            <br />
            CEP: 39520-000
          </p>
        </div>

        {/* APARBS Transportes */}
        <div className="flex flex-col leading-7">
          <h3 className="text-xl mb-1 text-[#d90000] font-bold">
            APARBS Transportes
          </h3>
          <p className="text-zinc-500 font-light">
            51.494.204/0001-67
          </p>
          <p>
            Av. Gabriel Mendes Santos, 330
            <br />
            Paciência
            <br />
            Porteirinha/MG
            <br />
            CEP: 39520-000
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center col-span-2 lg:col-span-1">
          <h3 className="text-xl mb-1 text-[#d90000] font-bold">
            APARBS Soluções Automotivas
          </h3>

          <Image
            width={150}
            height={80}
            src="/Aparbs Dark 3.svg" alt="APARBS Soluções Automotivas" />

          <p className="font-Hind">
            Há mais de 25 anos no mercado atendendo com qualidade,
            garantindo eficiência em serviços automotivos.
          </p>

          <div className="flex">
            <LinkIcons theme="bgBlack" />
          </div>
        </div>
      </div>

      <div className="flex py-4 leading-10 w-full border-[1.0px] items-center justify-center border-zinc-600">
        <div className="flex w-full max-w-screen-xl text-sm items justify-between px-9 md:px-4 lg:px-0 flex-col md:flex-row">
          <p>
            Copyright © {currentYear}
            <Link
              href="#"
              className="ml-2 font-bold focus:border-none no-underline hover:text-[#d90000]">
              APARBS Soluções Automotivas
            </Link>
          </p>

          <Link
            href="https://www.isaacmarcos.com.br"
            target="_blank"
            className="no-underline"
          >
            <div className="flex items-center justify-center h-8 w-[270px] rounded border border-slate-800 hover:border-yellow-500 shadow bg-slate-900 hover:bg-slate-800 transition-all text-center">
              <p>
                Construído por Isaac
              </p>
              <p className="font-bold">Marcos</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}