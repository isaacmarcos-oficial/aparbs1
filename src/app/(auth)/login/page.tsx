"use client"
import { Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dash"
      })

      if (result?.error) {
        toast.error("Erro durante o login. Verifique suas credenciais.")
      } else {
        toast.success("Login realizado com sucesso!")
        router.push(result?.url || "/dash")
      }
    } catch (error) {
      toast.error('Erro durante o login. Verifique suas credenciais.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Right side - Login Form */}
      <div className="w-full bg-zinc-900 flex flex-col justify-center p-8">
        <div className="max-w-md  mx-auto w-full">
          {/* Logo */}
          <Image
            src="/Aparbs Dark 5.svg"
            width={100}
            height={100}
            alt="logo da APARBS Soluções Automotivas"
            className="flex items-center justify-center w-full size-24 mb-4"
          />

          {/* Login Form */}
          <div className="mb-12 text-white">
            <h2 className="text-2xl font-semibold mb-8 text-center">Acesse sua conta</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block mb-2">E-mail</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Digite seu melhor-email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2">Senha</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="pr-10"
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Button>
                </div>
              </div>

              {/* <div className="flex items-center">
                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm">
                    Salvar informações
                  </label>
                </div>
                <a href="/forgotPassword" className="ml-auto text-green-500 text-sm">Esqueci minha senha</a>
              </div> */}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-md transition-colors cursor-pointer"
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </Button>
            </form>
          </div>

          {/* Registration link */}
          {/* <div className="flex items-center justify-center space-x-2 text-white">
            <div className="">Não tem uma conta?</div>
            <a href="/signup" className="text-green-500">Se inscreva aqui</a>
          </div> */}
        </div>
      </div>
    </div>
  )
}