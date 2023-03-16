/*
  Warnings:

  - You are about to drop the column `isNew` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `what_to_expect` on the `Service` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "serviceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whatToExpect" TEXT,
    "instructions" TEXT,
    "duration" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Service" ("createdAt", "description", "duration", "id", "instructions", "isBestSeller", "name", "price", "updatedAt") SELECT "createdAt", "description", "duration", "id", "instructions", "isBestSeller", "name", "price", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
