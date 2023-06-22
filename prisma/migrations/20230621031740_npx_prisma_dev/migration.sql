/*
  Warnings:

  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyLink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyUsername` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "displayName",
DROP COLUMN "spotifyLink",
DROP COLUMN "spotifyUsername";
