/*
  Warnings:

  - The `artistName` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "artistName",
ADD COLUMN     "artistName" TEXT[];
