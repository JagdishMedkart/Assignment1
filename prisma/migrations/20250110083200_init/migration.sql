-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wsCode" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "packageSize" INTEGER NOT NULL,
    "images" TEXT[],
    "tags" TEXT[],
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
