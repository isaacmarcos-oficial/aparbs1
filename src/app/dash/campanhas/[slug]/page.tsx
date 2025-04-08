import { CouponClient } from "./_components/couponClient";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex  w-full items-center justify-center">
              <h1 className="text-3xl font-bold text-center text-[#d90000]">
                NOME DA CAMPANHA
              </h1>
            </div>
          </div>
          <CouponClient />
        </div>
      </div>
    </div>
  );
}
