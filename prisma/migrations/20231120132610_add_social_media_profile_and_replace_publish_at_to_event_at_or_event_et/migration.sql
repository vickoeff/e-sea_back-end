/*
  Warnings:

  - You are about to drop the column `publish_at` on the `Announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "publish_at",
ADD COLUMN     "event_end_at" TIMESTAMP(3),
ADD COLUMN     "event_start_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT,
    "contact_number" TEXT,
    "icon" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL DEFAULT 'e-sea',
    "title_web" TEXT NOT NULL,
    "logo_1" TEXT NOT NULL,
    "logo_2" TEXT NOT NULL,
    "fav_icon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
