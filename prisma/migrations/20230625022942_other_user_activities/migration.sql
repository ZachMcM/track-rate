/*
  Warnings:

  - You are about to drop the column `outgoingUserId` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_outgoingUserId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "outgoingUserId",
ADD COLUMN     "otherUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_otherUserId_fkey" FOREIGN KEY ("otherUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
