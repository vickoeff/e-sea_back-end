/*
  Warnings:

  - Added the required column `imagePath` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "imagePath" TEXT NOT NULL;
