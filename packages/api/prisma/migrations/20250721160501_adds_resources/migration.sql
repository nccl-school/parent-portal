/*
  Warnings:

  - Changed the type of `role` on the `OrganizationMembership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrgRole" AS ENUM ('MEMBER', 'MANAGER', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('FOLDER', 'FILE', 'LINK', 'EXTERNAL_DOC');

-- CreateEnum
CREATE TYPE "FileSource" AS ENUM ('GOOGLE_DOCS', 'CUSTOM_UPLOAD');

-- CreateEnum
CREATE TYPE "ResourcePermission" AS ENUM ('EDITOR', 'MANAGER', 'VIEWER');

-- AlterTable
ALTER TABLE "OrganizationMembership" DROP COLUMN "role",
ADD COLUMN     "role" "OrgRole" NOT NULL;

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "parentResourceId" TEXT NOT NULL DEFAULT '__ROOT__',
    "ownerOrgId" TEXT,
    "ownerUserId" TEXT,
    "mimeType" TEXT,
    "fileUrl" TEXT,
    "externalSource" "FileSource",
    "externalId" TEXT,
    "webViewLink" TEXT,
    "exportLink" TEXT,
    "linkType" TEXT,
    "linkTargetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceAccessRule" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "permission" "ResourcePermission" NOT NULL,
    "userId" TEXT,
    "orgRole" "OrgRole",
    "orgWide" BOOLEAN,
    "isPublic" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceAccessRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_slug_parentResourceId_key" ON "Resource"("slug", "parentResourceId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_parentResourceId_fkey" FOREIGN KEY ("parentResourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_ownerOrgId_fkey" FOREIGN KEY ("ownerOrgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceAccessRule" ADD CONSTRAINT "ResourceAccessRule_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
