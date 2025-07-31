/*
  Warnings:

  - You are about to drop the column `nodeId` on the `ResourceAccessRule` table. All the data in the column will be lost.
  - Added the required column `resourceId` to the `ResourceAccessRule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResourceAccessRule" DROP CONSTRAINT "ResourceAccessRule_nodeId_fkey";

-- AlterTable
ALTER TABLE "ResourceAccessRule" DROP COLUMN "nodeId",
ADD COLUMN     "resourceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ResourceAccessRule" ADD CONSTRAINT "ResourceAccessRule_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
