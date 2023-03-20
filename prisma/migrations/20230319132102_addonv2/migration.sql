/*
  Warnings:

  - You are about to drop the `Addons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Addons";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Addon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "priceId" TEXT,
    "duration" INTEGER NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Addon_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
