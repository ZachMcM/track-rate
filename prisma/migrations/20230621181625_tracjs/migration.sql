/*
  Warnings:

  - You are about to drop the column `favoriteSong` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `favSong` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "favoriteSong",
ADD COLUMN     "favoriteTrack" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favSong",
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "favTrack" TEXT;
