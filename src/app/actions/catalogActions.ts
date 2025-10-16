import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

export async function getCatalog() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from("catalog").select()

  if (error) {
    console.error("Erro ao buscar Catálogo:", error)
    return []
  }

  return data ?? []
}

export async function getCatalogById(id: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("catalog")
    .select("*") // inclui os cupons relacionados
    .eq("id", id)
    .single()

  if (error) {
    console.error("Erro ao buscar catálogo:", error)
    return null
  }

  return data
}
