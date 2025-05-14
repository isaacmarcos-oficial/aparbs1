import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const Vagas = [
  {
    title: "Vendedor de Peças",
    link: "https://forms.gle/dnCG4yfxzRfEjsnH9",
  },
  {
    title: "Atendente de Balcão",
    link: "https://forms.gle/9Qjb3WKrXQ2WvA94A",
  },
];

export default function TabalheConosco() {
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-[#d90000] mb-8 text-center text-4xl font-extrabold">
        Tabalhe Conosco
      </h1>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        {Vagas.map((vaga) => (
          <Link key={vaga.link} href={vaga.link} target="_blank">
            <Card className="flex flex-col gap-2 bg-[#d90000] text-secondary hover:brightness-90 transition p-6 w-full">
              <CardHeader className="font-bold p-0" >
                {vaga.title}
              </CardHeader>
              <CardDescription className="text-xs text-secondary">
                Clique para se candidatar para a vaga de {vaga.title}
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}