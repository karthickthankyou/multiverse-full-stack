/*
  Warnings:

  - A unique constraint covering the columns `[parentNodeId,choiceNodeId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Choice_parentNodeId_choiceNodeId_key" ON "Choice"("parentNodeId", "choiceNodeId");
