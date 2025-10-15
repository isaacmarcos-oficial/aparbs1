/*
  Warnings:

  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `partners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `revenues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "partners";

-- DropTable
DROP TABLE "revenues";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "vehicles";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "amount" DECIMAL(10,2),
    "service" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicle" TEXT,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" DATE NOT NULL,
    "osNumber" TEXT,
    "client" TEXT,
    "vehicle" TEXT,
    "plate" TEXT,
    "paymentMethod" TEXT,
    "amount" DECIMAL(10,2),
    "service" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "model" TEXT,
    "plate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"("email");
