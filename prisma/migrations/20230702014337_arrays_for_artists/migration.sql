/*
  Warnings:

  - The `artistId` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `artistImage` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "artistId",
ADD COLUMN     "artistId" TEXT[],
DROP COLUMN "artistImage",
ADD COLUMN     "artistImage" TEXT[];
