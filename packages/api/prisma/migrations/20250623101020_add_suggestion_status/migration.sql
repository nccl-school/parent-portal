/*
  Warnings:

  - Added the required column `status` to the `Suggestion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('IDEA', 'PLANNED', 'IN_PROGRESS', 'COMPLETE');

-- AlterTable
ALTER TABLE "Suggestion" ADD COLUMN     "role" "SuggestionStatus" NOT NULL DEFAULT 'IDEA',
ADD COLUMN     "status" TEXT NOT NULL;
