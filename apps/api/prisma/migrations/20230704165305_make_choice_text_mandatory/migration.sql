/*
  Warnings:

  - Made the column `choiceText` on table `Node` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Node" ALTER COLUMN "choiceText" SET NOT NULL;
