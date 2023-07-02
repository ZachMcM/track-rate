/*
  Warnings:

  - You are about to drop the column `itemAlbumId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemAlbumName` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemArtistId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemArtistImage` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemArtistName` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemImage` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `Review` table. All the data in the column will be lost.
  - Added the required column `trackId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "itemAlbumId",
DROP COLUMN "itemAlbumName",
DROP COLUMN "itemArtistId",
DROP COLUMN "itemArtistImage",
DROP COLUMN "itemArtistName",
DROP COLUMN "itemId",
DROP COLUMN "itemImage",
DROP COLUMN "itemName",
ADD COLUMN     "albumId" TEXT,
ADD COLUMN     "albumImage" TEXT,
ADD COLUMN     "albumName" TEXT,
ADD COLUMN     "artistId" TEXT,
ADD COLUMN     "artistImage" TEXT,
ADD COLUMN     "artistName" TEXT,
ADD COLUMN     "trackId" TEXT NOT NULL,
ADD COLUMN     "trackName" TEXT NOT NULL;
