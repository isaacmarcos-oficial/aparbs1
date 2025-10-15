import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 Método GET: Buscar todos os parceiros
export async function GET() {
  try {
    const partners = await prisma.partner.findMany();
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Erro ao buscar parceiros:", error);
    return NextResponse.json({ error: "Erro ao buscar parceiros" }, { status: 500 });
  }
}

// 📌 Método POST: Criar um novo parceiro
export async function POST(req: Request) {
  try {
    const { name, url } = await req.json();
    if (!name || !url) {
      return NextResponse.json({ error: "Nome e URL são obrigatórios" }, { status: 400 });
    }

    const newPartner = await prisma.partner.create({
      data: { name, url },
    });

    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar parceiro:", error);
    return NextResponse.json({ error: "Erro ao criar parceiro" }, { status: 500 });
  }
}
