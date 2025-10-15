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

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "amount" DECIMAL(10,2),
    "service" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "vehicle" TEXT,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "drawnNumber" INTEGER NOT NULL,
    "drawnAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "couponId" UUID NOT NULL,
    "campaignId" UUID NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenues" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "osNumber" TEXT,
    "client" TEXT,
    "vehicle" TEXT,
    "plate" TEXT,
    "paymentMethod" TEXT,
    "amount" DECIMAL(10,2),
    "service" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" BIGSERIAL NOT NULL,
    "model" TEXT,
    "plate" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Campaign_name_idx" ON "campaign"("name");

-- CreateIndex
CREATE INDEX "Coupon_orderNumber_clientCode_idx" ON "coupon"("orderNumber", "clientCode");

-- CreateIndex
CREATE INDEX "Prize_campaignId_idx" ON "prize"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "Coupon_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

