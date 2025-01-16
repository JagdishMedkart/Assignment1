/*
  Warnings:

  - You are about to drop the column `salesPrice` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_wsCode_key";

-- AlterTable
CREATE SEQUENCE product_wscode_seq;
ALTER TABLE "Product" DROP COLUMN "salesPrice",
ALTER COLUMN "wsCode" SET DEFAULT nextval('product_wscode_seq');
ALTER SEQUENCE product_wscode_seq OWNED BY "Product"."wsCode";

-- CreateTable
CREATE TABLE "CartItem" (
    "cartItemId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartItemId")
);

-- RenameForeignKey
ALTER TABLE "Product" RENAME CONSTRAINT "fk_product_category" TO "Product_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("wsCode") ON DELETE CASCADE ON UPDATE CASCADE;
