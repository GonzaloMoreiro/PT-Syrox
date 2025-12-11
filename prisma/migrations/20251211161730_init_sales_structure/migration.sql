/*
  Warnings:

  - A unique constraint covering the columns `[orderNumber]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - The required column `orderNumber` was added to the `Sale` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('EN_PREPARACION', 'ENVIADO', 'CANCELADO', 'COMPLETADO');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDIENTE', 'PAGADO', 'FALLIDO');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "status" "SaleStatus" NOT NULL DEFAULT 'EN_PREPARACION',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_orderNumber_key" ON "Sale"("orderNumber");

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
