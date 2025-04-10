import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    const body = await req.json()
    const updatedUser = await prisma.user.update({
      where: id,
      data: body,
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error)
    return NextResponse.json({ error: 'Erro ao atualizar o usuário' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = await params
    await prisma.user.delete({
      where: id,
    })
    return NextResponse.json({ message: 'Usuário excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir o usuário:', error)
    return NextResponse.json({ error: 'Erro ao excluir o usuário' }, { status: 500 })
  }
}
