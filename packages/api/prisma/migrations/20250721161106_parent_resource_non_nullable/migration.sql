/*
  Warnings:

  - Made the column `parentResourceId` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_parentResourceId_fkey";

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "parentResourceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_parentResourceId_fkey" FOREIGN KEY ("parentResourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
