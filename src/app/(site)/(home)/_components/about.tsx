import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col w-full items-center justify-center py-8">
      <div className="flex flex-col w-full max-w-screen-xl px-4 md:px-4 lg:px-0">
        <div className="flex w-full flex-col items-center justify-center text-[#d90000]">
          <h1 className="text-4xl font-black text-center">
            <a href="#sobreaaparbs">APARBS Soluções Automotivas</a>
          </h1>

          <p className="text-center text-lg tracking-wide w-full md:w-1/2">
            Há mais de 25 anos no mercado atendendo com qualidade, <br/> garantindo
            eficiência em serviços automotivos.
          </p>
        </div>

        <div className="flex w-full gap-14 my-14 flex-col md:flex-row items-center justify-center">
          <div className="w-3/6">
            <Image
              width={400}
              height={500}
              src="/Fachada1.webp"
              alt="Fachada da oficina mecânica APARBS na cidade de Porteirinha MG e na cidade de Riacho dos Machados"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-[#d90000] text-3xl font-black mb-6 text-center md:text-start">
              Conheça Nossa História
            </h2>
            <p className="lg:text-lg font-light leading-7 text-zinc-600">
              A Aparbs é referência no ramo de soluções automotivas. Assim como os
              carros precisam das engrenagens para funcionar, a Aparbs também
              trabalha assim, cada irmão é uma engrenagem que faz tudo rodar e
              correr da melhor forma para atender às demandas dos clientes.
              <br /> <br />
              Na sua simbologia, pode-se observar o círculo, que é sinônimo de
              movimento.
              <br /> <br />
              Ele simboliza também a eternidade, as engrenagens que mantém tudo
              funcionando em ordem. Além disso, o elo dá referência à família por
              trás do negócio, que trabalha junta para a melhoria contínua da
              Aparbs!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}