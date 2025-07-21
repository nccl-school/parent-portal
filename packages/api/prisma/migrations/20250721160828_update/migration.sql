/*
  Warnings:

  - You are about to alter the column `parentResourceId` on the `Resource` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_parentResourceId_fkey";

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "parentResourceId" DROP NOT NULL,
ALTER COLUMN "parentResourceId" DROP DEFAULT,
ALTER COLUMN "parentResourceId" SET DATA TYPE VARCHAR(191);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_parentResourceId_fkey" FOREIGN KEY ("parentResourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
