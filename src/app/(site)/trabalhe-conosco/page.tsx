import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { client } from "@/lib/datoClient";
import { GET_VACANCY } from "@/lib/datoQueries";
import { DatoResponse, Vacancy } from "@/types/postTypes";
import Link from "next/link";

export default async function TabalheConosco() {

  let vacancy: Vacancy[] = [];

  try {
    const data: DatoResponse = await client.request(GET_VACANCY);
    vacancy = data?.allVacancies || [];
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-[#d90000] mb-8 text-center text-4xl font-extrabold">
        Tabalhe Conosco
      </h1>

      <div className="flex md:flex-row flex-col gap-4 p-4">
        {vacancy.map((vaga) => (
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