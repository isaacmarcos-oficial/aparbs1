/*
  Warnings:

  - You are about to drop the `expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `revenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "expense";

-- DropTable
DROP TABLE "revenue";

-- CreateTable
CREATE TABLE "revenues" (
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

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "date" TEXT,
    "description" TEXT,
    "category" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "service" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);
