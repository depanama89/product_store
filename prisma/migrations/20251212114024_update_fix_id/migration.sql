/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductHasCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductHasCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `productId` on the `ProductHasCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categoryId` on the `ProductHasCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ProductHasCategory" DROP CONSTRAINT "ProductHasCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductHasCategory" DROP CONSTRAINT "ProductHasCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductHasCategory" DROP CONSTRAINT "ProductHasCategory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "ProductHasCategory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductHasCategory_productId_categoryId_key" ON "ProductHasCategory"("productId", "categoryId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasCategory" ADD CONSTRAINT "ProductHasCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHasCategory" ADD CONSTRAINT "ProductHasCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
