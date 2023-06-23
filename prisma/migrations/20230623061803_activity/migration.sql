/*
  Warnings:

  - Added the required column `acitivityType` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "acitivityType" TEXT NOT NULL,
ADD COLUMN     "itemId" TEXT NOT NULL;
