/*
  Warnings:

  - You are about to drop the column `fav_icon` on the `Profile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'e-sea',
    "title_web" TEXT NOT NULL,
    "logo_1" TEXT NOT NULL,
    "logo_2" TEXT NOT NULL,
    "favicon" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Profile" ("created_at", "id", "logo_1", "logo_2", "title_web", "updated_at") SELECT "created_at", "id", "logo_1", "logo_2", "title_web", "updated_at" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
