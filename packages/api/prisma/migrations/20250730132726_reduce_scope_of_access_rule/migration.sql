/*
  Warnings:

  - You are about to drop the column `isPublic` on the `ResourceAccessRule` table. All the data in the column will be lost.
  - You are about to drop the column `orgRole` on the `ResourceAccessRule` table. All the data in the column will be lost.
  - You are about to drop the column `orgWide` on the `ResourceAccessRule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResourceAccessRule" DROP COLUMN "isPublic",
DROP COLUMN "orgRole",
DROP COLUMN "orgWide",
ADD COLUMN     "allSchool" BOOLEAN DEFAULT false,
ADD COLUMN     "orgId" BOOLEAN;
