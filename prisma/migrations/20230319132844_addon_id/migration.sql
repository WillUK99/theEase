/*
  Warnings:

  - Made the column `addonId` on table `Addon` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Addon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "addonId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Addon_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Addon" ("addonId", "createdAt", "duration", "id", "name", "price", "serviceId", "updatedAt") SELECT "addonId", "createdAt", "duration", "id", "name", "price", "serviceId", "updatedAt" FROM "Addon";
DROP TABLE "Addon";
ALTER TABLE "new_Addon" RENAME TO "Addon";
CREATE UNIQUE INDEX "Addon_addonId_key" ON "Addon"("addonId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
