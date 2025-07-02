/*
  Warnings:

  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('ADMIN', 'STAFF', 'USER');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" "RoleName" NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleId",
ADD COLUMN     "roleId" "RoleName" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
