/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderItem` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Audit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productWsCode` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Audit" DROP CONSTRAINT "fk_audit_user";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "fk_orderItem_product";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productId",
ADD COLUMN     "productWsCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "productId",
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("wsCode");

-- DropTable
DROP TABLE "Audit";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "fk_orderItem_product" FOREIGN KEY ("productWsCode") REFERENCES "Product"("wsCode") ON DELETE CASCADE ON UPDATE CASCADE;
