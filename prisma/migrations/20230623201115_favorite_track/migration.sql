/*
  Warnings:

  - The `favoriteTrack` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "favoriteTrack",
ADD COLUMN     "favoriteTrack" TEXT[];
