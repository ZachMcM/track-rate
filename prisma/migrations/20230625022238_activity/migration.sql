-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "outgoingUserId" TEXT,
    "itemId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_outgoingUserId_fkey" FOREIGN KEY ("outgoingUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
