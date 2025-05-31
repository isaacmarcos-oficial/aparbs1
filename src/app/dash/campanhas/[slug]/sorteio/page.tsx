'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useParams } from 'next/navigation';

type Coupon = {
  id: string;
  clientName: string;
  orderNumber: string;
  couponNumber: number[];
  isActive: boolean;
  isWinner: boolean;
  registrationDate: string;
  saleDate: string;
  prize: string | null;
  campaignId: string;
};

type Campaign = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  saleDate: string;
};

// Defina aqui os 10 prêmios da campanha:
const PRIZES_LIST = [
  'Cesta de Chocolate',
  'Cesta de Chocolate',
  'Cesta de Chocolate',
  'Cesta de Chocolate',
  'Estética Automotiva',
  'Estética Automotiva',
  'Vale Compras APARBS de R$100,00',
  'Vale Compras APARBS de R$100,00',
  'Vale Compras APARBS de R$100,00',
  'Vale Compras APARBS de R$100,00',
];

export default function DrawPage() {
  const params = useParams<{slug: string}>()
  const { slug: campaignId } = params;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [eligibleCount, setEligibleCount] = useState<number>(0);

  // Array de objetos com nome do prêmio, drawn=boolean e winner?=Coupon
  const [prizes, setPrizes] = useState<
    { name: string; drawn: boolean; winner?: Coupon }[]
  >([]);

  const [loadingDraw, setLoadingDraw] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 1) Na montagem, inicializamos “prizes” com os 10 nomes pré-definidos,
  // mas marcamos todos como drawn=false. Depois, buscamos no backend
  // quais cupons já ganharam algum desses prêmios (prize != null) e
  // atualizamos o estado para drawn=true e preenchemos winner.
  useEffect(() => {
    async function fetchInitialData() {
      try {
        // 1.1) Buscar dados da campanha
        const resCamp = await fetch(`/api/campaigns/${campaignId}`);
        if (!resCamp.ok) throw new Error('Erro ao buscar dados da campanha.');
        const dataCamp: Campaign = await resCamp.json();
        setCampaign(dataCamp);

        // 1.2) Buscar contagem de cupons elegíveis (isActive=true && isWinner=false)
        const resCount = await fetch(
          `/api/coupons/count?campaignId=${campaignId}&eligibleOnly=true`
        );
        if (!resCount.ok)
          throw new Error('Erro ao buscar número de cupons elegíveis.');
        const { count } = await resCount.json();
        setEligibleCount(count);

        // 1.3) Inicializar o array de prêmios com drawn=false
        const initialPrizes = PRIZES_LIST.map((prizeName) => ({
          name: prizeName,
          drawn: false,
        }));
        setPrizes(initialPrizes);

        // 1.4) Buscar cupons já premiados (isWinner=true e prize != null)
        const resAwarded = await fetch(
          `/api/coupons?campaignId=${campaignId}&isWinner=true`
        );
        if (!resAwarded.ok)
          throw new Error('Erro ao buscar cupons premiados.');
        const awardedCoupons: Coupon[] = await resAwarded.json();

        // Agrupar os premiados por prize
        const grouped: { [prizeName: string]: Coupon } = {};
        awardedCoupons.forEach((c) => {
          if (c.prize && !grouped[c.prize]) {
            grouped[c.prize] = c;
          }
        });

        // Atualizar drawn=true e winner para prêmios já sorteados
        setPrizes((prev) =>
          prev.map((p) =>
            grouped[p.name]
              ? { name: p.name, drawn: true, winner: grouped[p.name] }
              : p
          )
        );
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
      }
    }

    fetchInitialData();
  }, [campaignId]);

  // 2) Sortear um cupom para o prêmio de índice i
  const handleDrawPrize = async (i: number) => {
    setLoadingDraw(true);
    setError('');

    try {
      // 6.1.1) Chama o endpoint POST /api/campaigns/[campaignId]/draw com winnersCount=1
      const response = await fetch(`/api/campaigns/${campaignId}/draw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winnersCount: 1 }),
      });
      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Erro ao sortear prêmio.');
      }
      const { winners: [winner] }: { winners: Coupon[] } =
        await response.json();

      // 6.1.2) Atualizar estado local: marca prize[i].drawn = true e guarda quem foi
      setPrizes((prev) =>
        prev.map((p, idx) =>
          idx === i ? { name: p.name, drawn: true, winner } : p
        )
      );

      // 6.1.3) Atualizar contagem de cupons elegíveis
      setEligibleCount((prev) => prev - 1);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoadingDraw(false);
    }
  };

  // 3) Renderização condicional de erro/carregamento
  if (error && !campaign) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando dados da campanha...</p>
      </div>
    );
  }

  // 4) Render final
  return (
    <div className="p-8">
      {/* Dados da campanha */}
      <div className="mb-6">
        <h1 className="text-3xl w-full text-center font-bold text-[#d90000]">
          {campaign.name}
        </h1>
      </div>

      {/* Lista dos 10 prêmios pré-definidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {prizes.map((p, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.drawn && p.winner ? (
                  <p className="text-sm text-green-600">
                    Já sorteado para:{' '}
                    <span className="font-semibold">
                      {p.winner.clientName}
                    </span>
                    <br />
                    Número sorteado:{' '}
                    <span className="font-bold">
                      {p.winner.couponNumber.join(', ')}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">Ainda não sorteado</p>
                )}
              </div>

              <div>
                {!p.drawn ? (
                  <Button
                    onClick={() => handleDrawPrize(i)}
                    disabled={loadingDraw || eligibleCount < 1}
                  >
                    {loadingDraw ? 'Sorteando...' : 'Sortear'}
                  </Button>
                ) : (
                  <Button disabled className="bg-gray-300 hover:bg-gray-300">
                    Sorteado
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {error && campaign && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
