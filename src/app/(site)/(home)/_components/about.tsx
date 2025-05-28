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
            Há mais de 25 anos no mercado atendendo com qualidade, <br /> garantindo
            eficiência em serviços automotivos.
          </p>
        </div>

        <div className="flex w-full gap-14 my-14 flex-col md:flex-row items-center justify-center">
          <div className="w-3/6">
            <Image
              width={400}
              height={500}
              src="/Fachada1.png"
              alt="Fachada da oficina mecânica APARBS na cidade de Porteirinha MG e na cidade de Riacho dos Machados"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-[#d90000] text-3xl font-black mb-6 text-center md:text-start">
              Conheça Nossa História
            </h2>
            <p className="lg:text-lg font-light leading-7 text-zinc-600">
              A APARBS nasceu da paixão de <span className="font-bold text-[#d90000]">José Aelton</span> por carros e da vontade de fazer diferente. O que começou com uma pequena oficina à beira da estrada chamada Oficina Raio Sol, focada em alternadores e motores de arranque. Com muito trabalho, ele conquistou espaço e respeito, até chegar ao endereço atual.
              <br /> <br />
              Hoje, com mais de 25 anos de história, somos referência em soluções automotivas completas, mantendo o compromisso com qualidade, confiança.
              <br /> <br />
              Desde os primeiros atendimentos até hoje, nossa missão sempre foi clara: entregar um serviço confiável, seguro e acolhedor — daqueles que dão orgulho de indicar. Aqui, cada carro é tratado com o mesmo cuidado que damos aos nossos próprios veículos, e cada cliente é recebido como parte da nossa história.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}