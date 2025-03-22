"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Partner {
  id: string;
  name: string;
  url: string;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await fetch("/api/partners");
        if (!response.ok) throw new Error("Erro ao buscar parceiros.");

        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  return (
    <div className="flex w-full items-center justify-center py-12">
      <div className="w-full max-w-screen-lg flex flex-col items-center justify-center">
        <h2 className="text-[#d90000] mb-8 text-3xl font-black">
          <a href="#NossosServicos">Nossos Clientes</a>
        </h2>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-wrap gap-8 mx-4 items-center justify-center">
            {loading ? (
              <Skeleton />
            ) : partners.length > 0 ? (
              partners.map((partner) => (
                <div key={partner.id} className="gap-8">
                  <Image
                    width={80}
                    height={40}
                    quality={40}
                    alt={partner.name}
                    src={partner.url}
                    loading="lazy"
                    style={{ objectFit: "contain" }}
                    className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                  />
                </div>
              ))
            ) : (
              <p>Nenhum parceiro encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
