/*
  Warnings:

  - Added the required column `itemId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
