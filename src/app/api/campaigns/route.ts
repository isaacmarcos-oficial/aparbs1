// app/api/campaigns/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

type CreateCampaignDTO = {
  name: string;
  description?: string;
  startDate: string | Date;
  endDate: string | Date;
  isActive?: boolean;
};


export async function POST(request: Request) {
  let data: CreateCampaignDTO;

  try {
    data = await request.json();

    const { name, description, startDate, endDate, isActive } = data;

    const createdCampaign = await prisma.campaign.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isActive: isActive !== undefined && isActive !== null ? isActive : true,
      },
    });
    
    // Retorna a resposta com status 201 (Created)
    return NextResponse.json(createdCampaign, { status: 201 });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json({ error: "Payload JSON inválido." }, { status: 400 });
  }
}

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany()
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Erro ao buscar as campanhas:", error);
    return NextResponse.json({ error: 'Erro ao buscar as campanhas' }, { status: 500 });
  }
}

