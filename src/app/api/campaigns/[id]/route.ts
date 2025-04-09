import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params

    const campaign = await prisma.campaign.findUnique({
      where: id,
      include: { coupons: true },
    });
    if (!campaign) {
      return NextResponse.json({ error: 'Campanha não encontrada' }, { status: 404 });
    }
    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Erro ao buscar a campanha:', error);
    return NextResponse.json({ error: 'Erro ao buscar a campanha' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    const data = await request.json();
    const updatedCampaign = await prisma.campaign.update({
      where: id,
      data,
    });
    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error('Erro ao atualizar a campanha:', error);
    return NextResponse.json({ error: 'Erro ao atualizar a campanha' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    await prisma.campaign.delete({
      where: id,
    });
    return NextResponse.json({ message: 'Campanha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a campanha:', error);
    return NextResponse.json({ error: 'Erro ao excluir a campanha' }, { status: 500 });
  }
}
