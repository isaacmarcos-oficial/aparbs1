'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Ticket } from 'lucide-react'

type Coupon = {
  id: string
  clientName: string
  orderNumber: string
  couponNumber: number[]
  isActive: boolean
  isWinner: boolean
  registrationDate: string
  campaignId: string
}

// Função para formatar CPF no padrão "000.000.000-00"
function formatCPF(value: string): string {
  // Remove tudo o que não for dígito
  const digits = value.replace(/\D/g, '')
  // Limita a 11 dígitos, que é o tamanho do CPF
  const limited = digits.substring(0, 11)

  let formatted = ''
  if (limited.length > 0) {
    formatted = limited.substring(0, 3)
  }
  if (limited.length >= 4) {
    formatted += '.' + limited.substring(3, 6)
  }
  if (limited.length >= 7) {
    formatted += '.' + limited.substring(6, 9)
  }
  if (limited.length >= 10) {
    formatted += '-' + limited.substring(9, 11)
  }
  return formatted
}

export default function Page() {
  const [cpf, setCpf] = useState('')
  const [hasSearched, setHasSearched] = useState(false);
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    setCoupons([])
    setHasSearched(true);

    try {
      const response = await fetch(`/api/coupons?cpf=${encodeURIComponent(cpf)}`)
      if (!response.ok) throw new Error('Erro ao buscar cupons')
      const data = await response.json()
      setCoupons(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false)
    }
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setCpf(formatCPF(input))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-[#d90000]">
      <Card className='flex flex-col p-10 gap-4'>
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-bold text-[#d90000]">Consulte seus Bilhetes</h1>
          <p className="text-sm text-gray-600">Informe seu CPF para visualizar seus números de sorte.</p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={handleCpfChange}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading || cpf.length < 11}>
            Buscar
          </Button>
        </div>
      </Card>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && hasSearched && coupons.length === 0 && (
        <Card className="text-center p-4">
          Nenhum cupom encontrado para o CPF informado.
        </Card>
      )}


      {coupons.length > 0 && (
        <div className="flex flex-col gap-4">
          {coupons.map((coupon) => (
            <Card key={coupon.id} className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-700">{coupon.clientName}</h3>
              <p className="text-sm text-gray-600">OS/VB: {coupon.orderNumber}</p>
              <div className="grid grid-cols-3 gap-2">
                {coupon.couponNumber.map((num) => (
                  <span key={num} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                    <Ticket className="inline-block w-4 h-4 mr-1" /> {num}
                  </span>
                ))}
              </div>
              {coupon.isWinner && (
                <p className="text-sm font-bold text-yellow-600">🏆 Número premiado!</p>
              )}
            </Card>
          ))}
        </div>
      )}

    </div>
  )
}
