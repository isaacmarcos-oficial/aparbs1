-- CreateTable
CREATE TABLE "coupon" (
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
    "saleDate" TIMESTAMP(3) NOT NULL,
    "campaignId" TEXT,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "drawnNumber" INTEGER NOT NULL,
    "drawnAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "couponId" UUID NOT NULL,
    "campaignId" UUID NOT NULL,

    CONSTRAINT "prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "id" TEXT NOT NULL,
    "date" TEXT,
    "osNumber" TEXT,
    "client" TEXT,
    "vehicle" TEXT,
    "plate" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "date" TEXT,
    "description" TEXT,
    "category" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coupon_orderNumber_clientCode_idx" ON "coupon"("orderNumber", "clientCode");

-- CreateIndex
CREATE INDEX "campaign_name_idx" ON "campaign"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "prize_campaignId_idx" ON "prize"("campaignId");

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
