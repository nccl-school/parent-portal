/*
  Warnings:

  - You are about to drop the column `extId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `invitationId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invitedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_extId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "extId",
ADD COLUMN     "authId" TEXT,
ALTER COLUMN "invitationId" SET NOT NULL,
ALTER COLUMN "invitedAt" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
