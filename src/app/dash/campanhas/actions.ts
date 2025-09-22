import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export async function getCampaign() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from("campaign").select()

  if (error) {
    console.error("Erro ao buscar Campanha:", error)
    return []
  }

  return data ?? []
}

export async function getCampaignById(id: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("campaign")
    .select("*, coupon(*)") // inclui os cupons relacionados
    .eq("id", id)
    .single()

  if (error) {
    console.error("Erro ao buscar campanha:", error)
    return null
  }

  return data
}
