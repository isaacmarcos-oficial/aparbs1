import { getCampaignById } from "@/app/actions/campaignActions";
import { CouponClient } from "./_components/couponClient";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = await getCampaignById(slug)
  console.log(campaign)

  if (!campaign) {
    return <div className="text-center text-xl font-bold text-destructive">Campanha não encontrada.</div>;
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
      <CouponClient
        key={campaign.id}
        campaignId={campaign.id}
        coupons={campaign.coupon}
      />
    </div>
  );
}
