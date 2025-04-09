// "use client";
import { PrismaClient } from "@prisma/client";
import { CouponClient } from "./_components/couponClient";

const prisma = new PrismaClient()

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const campaign = await prisma.campaign.findUnique({
    where: { id: slug },
    include: { coupons: true,}
  })

  if (!campaign) {
    return <div>Campanha não encontrada.</div>;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <div className="flex  w-full items-center justify-center">
          <h1 className="text-3xl font-bold text-center uppercase text-[#d90000]">
            {campaign.name}
          </h1>
        </div>
      </div>
      <CouponClient key={campaign.id} campaignId={campaign.id} coupons={campaign.coupons} />
    </div>
  );
}
