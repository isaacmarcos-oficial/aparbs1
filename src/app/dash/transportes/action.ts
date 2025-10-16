"use server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export async function getVehicles() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from("vehicles").select()

  if (error) {
    console.error("Erro ao buscar veículos:", error)
    return []
  }

  return data ?? []
}