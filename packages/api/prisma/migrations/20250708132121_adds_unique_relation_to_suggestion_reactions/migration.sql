/*
  Warnings:

  - A unique constraint covering the columns `[createdById,suggestionId,type]` on the table `SuggestionReactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SuggestionReactions_createdById_suggestionId_type_key" ON "SuggestionReactions"("createdById", "suggestionId", "type");
