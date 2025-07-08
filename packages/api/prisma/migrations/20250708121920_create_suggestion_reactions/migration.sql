/*
  Warnings:

  - You are about to drop the column `dislikes` on the `Suggestion` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Suggestion` table. All the data in the column will be lost.
  - You are about to drop the `SuggestionComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE', 'COMMENT');

-- DropForeignKey
ALTER TABLE "SuggestionComments" DROP CONSTRAINT "SuggestionComments_createdById_fkey";

-- DropForeignKey
ALTER TABLE "SuggestionComments" DROP CONSTRAINT "SuggestionComments_suggestionId_fkey";

-- AlterTable
ALTER TABLE "Suggestion" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- DropTable
DROP TABLE "SuggestionComments";

-- CreateTable
CREATE TABLE "SuggestionReactions" (
    "id" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "suggestionId" TEXT NOT NULL,

    CONSTRAINT "SuggestionReactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SuggestionReactions" ADD CONSTRAINT "SuggestionReactions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionReactions" ADD CONSTRAINT "SuggestionReactions_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "Suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
