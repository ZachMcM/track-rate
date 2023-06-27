/*
  Warnings:

  - You are about to drop the column `item` on the `Review` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "item",
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "itemName" TEXT NOT NULL;
