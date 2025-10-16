import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export const VonixxLines = [
  {
    id: 1,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/VONIXX_dcnufr.jpg",
    name: "Vonixx"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/RAZUX_al0c2k.jpg",
    name: "Razux"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/ZACS_em90mr.jpg",
    name: "Zacs"
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/diqaqpm8y/image/upload/v1760464601/VINTEX_j8x7lz.jpg",
    name: "Vintex"
  }
]

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
