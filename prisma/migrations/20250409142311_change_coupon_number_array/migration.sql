-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "clientCode" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "purchaseValue" DOUBLE PRECISION NOT NULL,
    "cpf" TEXT NOT NULL,
    "hasInstagramPost" BOOLEAN NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "couponNumber" INTEGER[],
    "campaignId" TEXT,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Coupon_orderNumber_clientCode_idx" ON "Coupon"("orderNumber", "clientCode");

-- CreateIndex
CREATE INDEX "Campaign_name_idx" ON "Campaign"("name");

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
