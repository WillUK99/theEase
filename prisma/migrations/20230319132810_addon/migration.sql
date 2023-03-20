/*
  Warnings:

  - You are about to drop the column `priceId` on the `Addon` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "addonId" TEXT,
    "duration" INTEGER NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Addon_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Addon" ("createdAt", "duration", "id", "name", "price", "serviceId", "updatedAt") SELECT "createdAt", "duration", "id", "name", "price", "serviceId", "updatedAt" FROM "Addon";
DROP TABLE "Addon";
ALTER TABLE "new_Addon" RENAME TO "Addon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
