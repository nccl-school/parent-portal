/*
  Warnings:

  - You are about to drop the column `userId` on the `Suggestion` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SuggestionComments` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Suggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `SuggestionComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Suggestion" DROP CONSTRAINT "Suggestion_userId_fkey";

-- DropForeignKey
ALTER TABLE "SuggestionComments" DROP CONSTRAINT "SuggestionComments_userId_fkey";

-- AlterTable
ALTER TABLE "Suggestion" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuggestionComments" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionComments" ADD CONSTRAINT "SuggestionComments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
