-- CreateEnum
CREATE TYPE "UserStoryType" AS ENUM ('WISHLISTED', 'IN_CART', 'PURCHASED');

-- CreateTable
CREATE TABLE "UserStory" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uid" TEXT NOT NULL,
    "storyId" INTEGER NOT NULL,
    "type" "UserStoryType" NOT NULL,

    CONSTRAINT "UserStory_pkey" PRIMARY KEY ("uid","storyId")
);
