/*
  Warnings:

  - Added the required column `author` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "author" TEXT NOT NULL;
