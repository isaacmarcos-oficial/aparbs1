"use client"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="mx-auto my-auto">
        <h1 className="text-2xl font-bold w-full h-full text-center ">Olá, <span className="text-red-500">{user?.name}</span>! <br /> Bem vindo ao painel administrativo</h1>
      </div>
    </div>
  )
}
