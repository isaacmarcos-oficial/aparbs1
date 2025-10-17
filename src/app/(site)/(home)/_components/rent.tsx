import Image from "next/image";
import Link from "next/link";

export default function Rent() {
  return (
    <section aria-labelledby="rent-title" className="flex w-full items-center justify-center">
      <div className="max-w-screen-xl w-full rounded-lg">
        <h2 id="rent-title" className="sr-only">
          Aluguel de Carros em Porteirinha, MG com flexibilidade, conforto e privacidade
        </h2>
        <Link
          href="https://wa.me/3832208767?text=Ol%C3%A1%21%20Estou%20no%20site%20da%20APARBS%20e%20gostaria%20alugar%20um%20ve%C3%ADculo%21"
          target="_blank"
        >
          <div className="">
            <Image
              src="https://res.cloudinary.com/diqaqpm8y/image/upload/v1753102188/Loca%C3%A7%C3%A3o_ec90rb.png"
              alt="Alugue agora um carro em Porteirinha MG com flexibilidade, conforto e privacidade, acessibilidade, conveniência."
              className="w-screen object-cover max-h-64 md:max-h-96 lg:max-h-[600px] hover:opacity-80 transition-all duration-300 rounded-xl"
              width={1800}
              height={600}
              quality={80}
            />
          </div>
        </Link>
      </div>
    </section>
  )
}