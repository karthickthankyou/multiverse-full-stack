/*
  Warnings:

  - You are about to drop the column `parentNodeId` on the `Node` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_parentNodeId_fkey";

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "parentNodeId";

-- CreateTable
CREATE TABLE "_Choices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Choices_AB_unique" ON "_Choices"("A", "B");

-- CreateIndex
CREATE INDEX "_Choices_B_index" ON "_Choices"("B");

-- AddForeignKey
ALTER TABLE "_Choices" ADD CONSTRAINT "_Choices_A_fkey" FOREIGN KEY ("A") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Choices" ADD CONSTRAINT "_Choices_B_fkey" FOREIGN KEY ("B") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
