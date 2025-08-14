/*
  Warnings:

  - Changed the type of `role` on the `OrganizationMembership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."OrgRole" AS ENUM ('MEMBER', 'MANAGER', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "public"."ResourceType" AS ENUM ('FOLDER', 'FILE', 'LINK', 'EXTERNAL_DOC');

-- CreateEnum
CREATE TYPE "public"."FileSource" AS ENUM ('GOOGLE_DOCS');

-- CreateEnum
CREATE TYPE "public"."ResourcePermission" AS ENUM ('VIEWER', 'EDITOR', 'MANAGER');

-- AlterTable
ALTER TABLE "public"."OrganizationMembership" DROP COLUMN "role",
ADD COLUMN     "role" "public"."OrgRole" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Resource" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."ResourceType" NOT NULL,
    "parentResourceId" VARCHAR(191) NOT NULL,
    "ownerOrgId" TEXT,
    "ownerUserId" TEXT,
    "mimeType" TEXT,
    "fileUrl" TEXT,
    "externalSource" "public"."FileSource",
    "externalId" TEXT,
    "linkType" TEXT,
    "linkTargetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResourceAccessRule" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "permission" "public"."ResourcePermission" NOT NULL,
    "userId" TEXT,
    "orgId" TEXT,
    "allSchool" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceAccessRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_slug_parentResourceId_key" ON "public"."Resource"("slug", "parentResourceId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceAccessRule_resourceId_userId_key" ON "public"."ResourceAccessRule"("resourceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceAccessRule_resourceId_orgId_key" ON "public"."ResourceAccessRule"("resourceId", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceAccessRule_resourceId_allSchool_key" ON "public"."ResourceAccessRule"("resourceId", "allSchool");

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_parentResourceId_fkey" FOREIGN KEY ("parentResourceId") REFERENCES "public"."Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_ownerOrgId_fkey" FOREIGN KEY ("ownerOrgId") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResourceAccessRule" ADD CONSTRAINT "ResourceAccessRule_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
