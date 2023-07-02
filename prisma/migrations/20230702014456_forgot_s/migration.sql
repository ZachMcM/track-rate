/*
  Warnings:

  - You are about to drop the column `artistId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `artistImage` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `artistName` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "artistId",
DROP COLUMN "artistImage",
DROP COLUMN "artistName",
ADD COLUMN     "artistIds" TEXT[],
ADD COLUMN     "artistImages" TEXT[],
ADD COLUMN     "artistNames" TEXT[];
