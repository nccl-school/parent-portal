/*
  Warnings:

  - You are about to drop the column `role` on the `Suggestion` table. All the data in the column will be lost.
  - The `status` column on the `Suggestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Suggestion" DROP COLUMN "role",
DROP COLUMN "status",
ADD COLUMN     "status" "SuggestionStatus" NOT NULL DEFAULT 'IDEA';
