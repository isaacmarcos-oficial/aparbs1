// app/api/coupons/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    const coupon = await prisma.coupon.findUnique({
      where: id,
    });
    if (!coupon) {
      return NextResponse.json({ error: 'Cupom não encontrado' }, { status: 404 });
    }
    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Erro ao buscar o cupom:', error);
    return NextResponse.json({ error: 'Erro ao buscar o cupom' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    const data = await req.json();
    const updatedCoupon = await prisma.coupon.update({
      where: id,
      data,
    });
    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error('Erro ao atualizar o cupom:', error);
    return NextResponse.json({ error: 'Erro ao atualizar o cupom' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    await prisma.coupon.delete({
      where: id,
    });
    return NextResponse.json({ message: 'Cupom excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o cupom:', error);
    return NextResponse.json({ error: 'Erro ao excluir o cupom' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    const coupon = await prisma.coupon.findUnique({
      where: id,
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Cupom não encontrado' }, { status: 404 });
    }

    if (coupon.hasInstagramPost) {
      return NextResponse.json({ message: 'Cupom já possui post no Instagram' });
    }

    // Gerar dois números únicos adicionais
    const existing = new Set(coupon.couponNumber);
    const newNumbers: number[] = [];

    while (newNumbers.length < 2) {
      const number = Math.floor(Math.random() * 90000) + 10000;
      if (!existing.has(number)) {
        newNumbers.push(number);
        existing.add(number);
      }
    }

    const updated = await prisma.coupon.update({
      where: id,
      data: {
        hasInstagramPost: true,
        couponNumber: [...coupon.couponNumber, ...newNumbers],
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro no PATCH do cupom:", error);
    return NextResponse.json({ error: 'Erro ao atualizar cupom' }, { status: 500 });
  }
}