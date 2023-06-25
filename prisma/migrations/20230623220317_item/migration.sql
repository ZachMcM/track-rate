/*
  Warnings:

  - You are about to drop the column `itemId` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "itemId",
ADD COLUMN     "item" TEXT[];
