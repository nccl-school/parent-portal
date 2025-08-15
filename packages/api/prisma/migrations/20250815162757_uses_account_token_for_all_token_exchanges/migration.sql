/*
  Warnings:

  - You are about to drop the `Invite` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AccountTokenType" AS ENUM ('INVITE', 'PASSWORD_RESET');

-- DropForeignKey
ALTER TABLE "public"."Invite" DROP CONSTRAINT "Invite_createdById_fkey";

-- DropTable
DROP TABLE "public"."Invite";

-- CreateTable
CREATE TABLE "public"."AccountToken" (
    "id" TEXT NOT NULL,
    "type" "public"."AccountTokenType" NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "acceptedById" TEXT,
    "revokedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountToken_tokenHash_key" ON "public"."AccountToken"("tokenHash");

-- AddForeignKey
ALTER TABLE "public"."AccountToken" ADD CONSTRAINT "AccountToken_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
