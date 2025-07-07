/*
  Warnings:

  - The values [IDEA,DRAFT] on the enum `SuggestionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `downVotes` on the `Suggestion` table. All the data in the column will be lost.
  - You are about to drop the column `upVotes` on the `Suggestion` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SuggestionStatus_new" AS ENUM ('DISCUSSION', 'PLANNED', 'IN_PROGRESS', 'COMPLETE');
ALTER TABLE "Suggestion" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Suggestion" ALTER COLUMN "status" TYPE "SuggestionStatus_new" USING ("status"::text::"SuggestionStatus_new");
ALTER TYPE "SuggestionStatus" RENAME TO "SuggestionStatus_old";
ALTER TYPE "SuggestionStatus_new" RENAME TO "SuggestionStatus";
DROP TYPE "SuggestionStatus_old";
ALTER TABLE "Suggestion" ALTER COLUMN "status" SET DEFAULT 'DISCUSSION';
COMMIT;

-- AlterTable
ALTER TABLE "Suggestion" DROP COLUMN "downVotes",
DROP COLUMN "upVotes",
ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'DISCUSSION';

-- CreateTable
CREATE TABLE "SuggestionComments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suggestionId" TEXT NOT NULL,

    CONSTRAINT "SuggestionComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SuggestionComments" ADD CONSTRAINT "SuggestionComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionComments" ADD CONSTRAINT "SuggestionComments_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "Suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
