import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function generateUniqueNumbers(count: number): number[] {
  const result: number[] = [];
  const used = new Set<number>();

  while (result.length < count) {
    const number = Math.floor(Math.random() * 90000) + 10000;
    if (!used.has(number)) {
      result.push(number);
      used.add(number);
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

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data.clientCode ||
      !data.clientName ||
      !data.orderNumber ||
      !data.purchaseValue ||
      data.hasInstagramPost === undefined ||
      !data.cpf
    ) {
      throw new Error("Dados obrigatórios não informados.");
    }

    const quantity = calculateCouponCount(data.purchaseValue, data.hasInstagramPost);
    const couponNumber = generateUniqueNumbers(quantity);

    const couponData = {
      clientCode: data.clientCode,
      clientName: data.clientName,
      orderNumber: data.orderNumber,
      purchaseValue: data.purchaseValue,
      cpf: data.cpf,
      hasInstagramPost: data.hasInstagramPost,
      registrationDate: new Date(), // Define a data atual
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cpf = searchParams.get('cpf')

  try {
    const coupons = await prisma.coupon.findMany({
      where: cpf ? { cpf } : undefined,
      orderBy: { registrationDate: 'desc' },
    })
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Erro ao buscar os cupons:", error);
    return NextResponse.json({ error: 'Erro ao buscar os cupons' }, { status: 500 });
  }
}
