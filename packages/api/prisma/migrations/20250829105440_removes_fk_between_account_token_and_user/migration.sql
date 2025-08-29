/*
  Warnings:

  - You are about to drop the column `acceptedById` on the `AccountToken` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `AccountToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AccountToken" DROP CONSTRAINT "AccountToken_createdById_fkey";

-- AlterTable
ALTER TABLE "public"."AccountToken" DROP COLUMN "acceptedById",
DROP COLUMN "createdById",
ADD COLUMN     "acceptedBy" TEXT,
ADD COLUMN     "createdBy" TEXT;
