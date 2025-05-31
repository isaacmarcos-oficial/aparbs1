import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

async function generateUniqueNumbers(count: number): Promise<number[]> {
  const result: number[] = [];

  // Consulta todos os números de cupons já gerados no banco
  const coupons = await prisma.coupon.findMany({
    select: { couponNumber: true }
  });

  // Cria um conjunto (Set) com os números já utilizados
  const used = new Set<number>();
  for (const coupon of coupons) {
    coupon.couponNumber.forEach(num => used.add(num));
  }

  // Gera números únicos evitando os já utilizados
  while (result.length < count) {
    const candidate = Math.floor(Math.random() * 90000) + 10000;
    if (!used.has(candidate)) {
      result.push(candidate);
      used.add(candidate);
    }
  }

  return result;
}

function calculateCouponCount(purchaseValue: number, hasInstagramPost: boolean): number {
  let count = 1;

  if (purchaseValue >= 500) count += 2;
  else if (purchaseValue >= 200) count += 1;

  if (hasInstagramPost) count += 2;

  return count;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const cpf = searchParams.get('cpf')
  const campaignId = searchParams.get('campaignId');
  const isWinnerParam = searchParams.get('isWinner');
  const eligibleOnlyParam = searchParams.get('eligibleOnly');

  // Montamos o objeto `where` dinamicamente
  const whereClause: Prisma.CouponWhereInput = {};
  if (cpf) {
    whereClause.cpf = cpf;
  }
  if (campaignId) {
    whereClause.campaignId = campaignId;
  }

  // Se for passada a flag eligibleOnly=true, forçamos isActive=true e isWinner=false
  if (eligibleOnlyParam === 'true') {
    whereClause.isActive = true;
    whereClause.isWinner = false;
  }
  // Caso contrário, se for passado isWinner explicitamente, respeitamos esse filtro
  else if (isWinnerParam !== null) {
    whereClause.isWinner = isWinnerParam === 'true';
  }

  try {
    const coupons = await prisma.coupon.findMany({
      where: whereClause,
      orderBy: { registrationDate: 'desc' },
    })
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Erro ao buscar os cupons:", error);
    return NextResponse.json({ error: 'Erro ao buscar os cupons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.clientCode ||
      !data.clientName ||
      !data.orderNumber ||
      !data.purchaseValue ||
      data.hasInstagramPost === undefined ||
      !data.cpf ||
      !data.saleDate
    ) {
      throw new Error("Dados obrigatórios não informados.");
    }

    const quantity = calculateCouponCount(data.purchaseValue, data.hasInstagramPost);
    const couponNumber = await generateUniqueNumbers(quantity);

    const couponData = {
      clientCode: data.clientCode,
      clientName: data.clientName,
      orderNumber: data.orderNumber,
      purchaseValue: data.purchaseValue,
      cpf: data.cpf,
      hasInstagramPost: data.hasInstagramPost,
      registrationDate: new Date(), // Define a data atual
      saleDate: new Date(data.saleDate),
      couponNumber,
      campaignId: data.campaignId || null,
    };


    const createdCoupon = await prisma.coupon.create({
      data: couponData,
    });
    return NextResponse.json(createdCoupon, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar cupom:", error);
    return NextResponse.json({ error: 'Erro ao criar o cupom' }, { status: 500 });
  }
}