/*
  Warnings:

  - You are about to drop the column `albumLink` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `songLink` on the `Review` table. All the data in the column will be lost.
  - Added the required column `link` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "albumLink",
DROP COLUMN "review",
DROP COLUMN "songLink",
ADD COLUMN     "link" TEXT NOT NULL;
