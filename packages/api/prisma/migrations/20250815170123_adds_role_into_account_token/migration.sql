/*
  Warnings:

  - Added the required column `roleId` to the `AccountToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."AccountToken" ADD COLUMN     "roleId" "public"."RoleName" NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."AccountToken" ADD CONSTRAINT "AccountToken_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
