"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

interface LinkBioProps {
  title: string;
  iconLink: React.ReactNode;
  adress: string;
  target?: string
}

export default function LinkBio({ title, iconLink, adress, target }: LinkBioProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={adress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target={target}
    >
      <Card className={`flex items-center h-14 p-4 rounded ${isHovered ? "text-pimary" : "text-[#d90000]"} font-bold transition-all`}>
        <span className="mr-4 text-3xl">
          {iconLink} {/* Renderiza o ícone diretamente */}
        </span>
        <h2>{title}</h2>
      </Card>
    </Link>
  )
}