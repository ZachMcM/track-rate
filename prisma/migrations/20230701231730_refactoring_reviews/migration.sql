/*
  Warnings:

  - You are about to drop the column `favoriteTrackId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteTrackName` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `favAlbum` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `favArtist` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `favTrack` on the `User` table. All the data in the column will be lost.
  - Added the required column `itemImage` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "favoriteTrackId",
DROP COLUMN "favoriteTrackName",
ADD COLUMN     "itemAlbumId" TEXT,
ADD COLUMN     "itemAlbumName" TEXT,
ADD COLUMN     "itemArtistId" TEXT,
ADD COLUMN     "itemArtistName" TEXT,
ADD COLUMN     "itemImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favAlbum",
DROP COLUMN "favArtist",
DROP COLUMN "favTrack";
