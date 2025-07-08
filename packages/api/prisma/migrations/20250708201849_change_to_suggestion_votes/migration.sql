/*
  Warnings:

  - You are about to drop the `SuggestionReactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SuggestionVoteType" AS ENUM ('LIKE', 'DISLIKE');

-- DropForeignKey
ALTER TABLE "SuggestionReactions" DROP CONSTRAINT "SuggestionReactions_createdById_fkey";

-- DropForeignKey
ALTER TABLE "SuggestionReactions" DROP CONSTRAINT "SuggestionReactions_suggestionId_fkey";

-- DropTable
DROP TABLE "SuggestionReactions";

-- DropEnum
DROP TYPE "ReactionType";

-- CreateTable
CREATE TABLE "SuggestionVote" (
    "id" TEXT NOT NULL,
    "type" "SuggestionVoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "suggestionId" TEXT NOT NULL,

    CONSTRAINT "SuggestionVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuggestionVote_createdById_suggestionId_key" ON "SuggestionVote"("createdById", "suggestionId");

-- AddForeignKey
ALTER TABLE "SuggestionVote" ADD CONSTRAINT "SuggestionVote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestionVote" ADD CONSTRAINT "SuggestionVote_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "Suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
