import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { Catalog } from "@/types/catalogTypes"

export async function getCatalog() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from("catalog").select()

  const sortedCatalog = (data || []).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (error) {
    console.error("Erro ao buscar Catálogo:", error)
    return []
  }

  return sortedCatalog ?? []
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

export async function getProductBySlug(slug: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("catalog")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Erro ao buscar catálogo:", error)
    return null
  }

  return data
}

export async function getRelatedProducts(category: string, excludeId: number): Promise<Catalog[]> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from("catalog")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(3)

  if (error) {
    console.error("Erro ao buscar produtos relacionados:", error)
    return []
  }

  return data ?? []
}


export async function createCatalog(data: Partial<Catalog>) {
  console.log("Dados recebidos para criação de catálogo:", data)
  // Aqui futuramente você poderá fazer a inserção no Supabase
}
