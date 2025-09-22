"use server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { hash } from "bcryptjs";


interface UserFormData {
  name: string
  email: string
  role: string
  password?: string
}

export async function getUsers() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from("users").select()

  if (error) {
    console.error("Erro ao buscar usuários:", error)
    return []
  }

  return data ?? []
}

export async function createUser(formData: UserFormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  if (!formData.email || !formData.password) {
    throw new Error("Email e senha são obrigatórios.")
  }

  // Verifica se o usuário já existe
  const { data: existing, error: findError } = await supabase
    .from("users")
    .select("id")
    .eq("email", formData.email)
    .single()

  if (findError) {
    console.error("Erro ao verificar usuário existente:", findError)
  }

  if (existing) {
    throw new Error("Usuário já existe.")
  }

  // Gera o hash da senha
  const hashedPassword = await hash(formData.password, 12)

  const { error } = await supabase.from("users").insert([
    {
      name: formData.name,
      email: formData.email,
      role: formData.role || "user",
      password: hashedPassword,
    },
  ])

  if (error) {
    console.error("Erro ao criar usuário:", error)
    throw new Error(error.message)
  }
}

export async function updateUser(id: string, formData: UserFormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase
    .from("users")
    .update(formData)
    .eq("id", id)

  if (error) {
    console.error("Erro ao atualizar usuário:", error)
    throw new Error(error.message)
  }
}
