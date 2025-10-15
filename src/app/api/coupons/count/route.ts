// /app/api/coupons/count/route.ts
import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const campaignId = url.searchParams.get('campaignId');
    const eligibleOnly = url.searchParams.get('eligibleOnly') === 'true';

    if (!campaignId) {
      return NextResponse.json({ error: 'campaignId é obrigatório.' }, { status: 400 });
    }

    const whereClause: Prisma.couponWhereInput = { campaignId };
    if (eligibleOnly) {
      whereClause.isActive = true;
      whereClause.isWinner = false;
    }

    const count = await prisma.coupon.count({
      where: whereClause,
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.error('Erro ao contar cupons:', err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
