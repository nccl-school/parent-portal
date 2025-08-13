/*
  Warnings:

  - The values [CUSTOM_UPLOAD] on the enum `FileSource` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `exportLink` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `webViewLink` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."FileSource_new" AS ENUM ('GOOGLE_DOCS');
ALTER TABLE "public"."Resource" ALTER COLUMN "externalSource" TYPE "public"."FileSource_new" USING ("externalSource"::text::"public"."FileSource_new");
ALTER TYPE "public"."FileSource" RENAME TO "FileSource_old";
ALTER TYPE "public"."FileSource_new" RENAME TO "FileSource";
DROP TYPE "public"."FileSource_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Resource" DROP COLUMN "exportLink",
DROP COLUMN "webViewLink";
