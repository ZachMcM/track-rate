/*
  Warnings:

  - You are about to drop the column `favoriteTrack` on the `Review` table. All the data in the column will be lost.
  - Added the required column `favoriteTrackId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favoriteTrackName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "favoriteTrack",
ADD COLUMN     "favoriteTrackId" TEXT NOT NULL,
ADD COLUMN     "favoriteTrackName" TEXT NOT NULL;
