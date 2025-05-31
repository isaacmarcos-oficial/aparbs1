// /app/api/campaigns/[slug]/draw/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DrawRequestBody {
  winnersCount: number;
}

function shuffleArray<T>(array: T[]): T[] {
  // Fisher–Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = params;
    const { slug: campaignId } = await slug;
    const body = (await request.json()) as DrawRequestBody;
    const { winnersCount } = body;

    if (!winnersCount || typeof winnersCount !== 'number' || winnersCount < 1) {
      return NextResponse.json(
        { error: 'Quantidade de ganhadores inválida.' },
        { status: 400 }
      );
    }

    // 1) Buscar todos os cupons elegíveis: isActive = true e isWinner = false
    const eligibleCoupons = await prisma.coupon.findMany({
      where: {
        campaignId,
        isActive: true,
        isWinner: false,
      },
      select: {
        id: true,
      },
    });

    if (eligibleCoupons.length < winnersCount) {
      return NextResponse.json(
        {
          error: `Número insuficiente de cupons elegíveis para sortear ${winnersCount} ganhador(es). Só existem ${eligibleCoupons.length} disponíveis.`,
        },
        { status: 400 }
      );
    }

    // 2) Embaralhar e selecionar os IDs dos cupons ganhadores
    const allIds = eligibleCoupons.map((c) => c.id);
    const shuffled = shuffleArray(allIds);
    const winnersIds = shuffled.slice(0, winnersCount);

    // 3) Em transação, marcar isWinner = true para cada cupom sorteado
    const winners = await prisma.$transaction(
      winnersIds.map((id) =>
        prisma.coupon.update({
          where: { id },
          data: { isWinner: true },
        })
      )
    );

    // 4) Retornar os cupons vencedores
    return NextResponse.json({ winners }, { status: 200 });
  } catch (err) {
    console.error('Erro no sorteio:', err);
    return NextResponse.json(
      { error: 'Erro ao realizar o sorteio.' },
      { status: 500 }
    );
  }
}
