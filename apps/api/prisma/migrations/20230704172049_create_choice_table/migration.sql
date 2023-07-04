/*
  Warnings:

  - You are about to drop the column `choiceText` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the `_Choices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Choices" DROP CONSTRAINT "_Choices_A_fkey";

-- DropForeignKey
ALTER TABLE "_Choices" DROP CONSTRAINT "_Choices_B_fkey";

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "choiceText";

-- DropTable
DROP TABLE "_Choices";

-- CreateTable
CREATE TABLE "Choice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "choiceText" TEXT NOT NULL,
    "parentNodeId" INTEGER,
    "choiceNodeId" INTEGER,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_parentNodeId_fkey" FOREIGN KEY ("parentNodeId") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_choiceNodeId_fkey" FOREIGN KEY ("choiceNodeId") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;
