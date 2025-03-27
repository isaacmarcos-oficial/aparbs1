import Image from "next/image";
import { GET_PARTNERS } from "@/lib/datoQueries";
import { client } from "@/lib/datoClient";
import { DatoResponse, Partner } from "@/types/postTypes";

export default async function Partners() {
  let partners: Partner[] = [];

  try {
    const data: DatoResponse = await client.request(GET_PARTNERS);
    partners = data?.allPartners || [];
  } catch (error) {
    console.error("Erro ao buscar partners:", error);
  }

  return (
    <div className="flex w-full items-center justify-center py-12">
      <div className="w-full max-w-screen-lg flex flex-col items-center justify-center">
        <h2 className="text-[#d90000] mb-8 text-3xl font-black">
          <a href="#NossosServicos">Nossos Clientes</a>
        </h2>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-wrap gap-8 mx-4 items-center justify-center">
            {partners.map((partner) => (
              <div key={partner.id} className="gap-8">
                <Image
                  width={80}
                  height={40}
                  quality={40}
                  alt={partner.business}
                  src={partner.image.url}
                  loading="lazy"
                  style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "25px"
                  }}
                  className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
