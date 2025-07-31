/*
  Warnings:

  - A unique constraint covering the columns `[resourceId,userId]` on the table `ResourceAccessRule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resourceId,orgId]` on the table `ResourceAccessRule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resourceId,allSchool]` on the table `ResourceAccessRule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ResourceAccessRule" ALTER COLUMN "orgId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ResourceAccessRule_resourceId_userId_key" ON "public"."ResourceAccessRule"("resourceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceAccessRule_resourceId_orgId_key" ON "public"."ResourceAccessRule"("resourceId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceAccessRule_resourceId_allSchool_key" ON "public"."ResourceAccessRule"("resourceId", "allSchool");
