-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "price" INTEGER NOT NULL,
    "serviceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whatToExpect" TEXT,
    "instructions" TEXT,
    "duration" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "updatedBy" TEXT NOT NULL
);
INSERT INTO "new_Service" ("createdAt", "description", "duration", "id", "instructions", "isActive", "isBestSeller", "isFeatured", "name", "price", "serviceId", "updatedAt", "updatedBy", "whatToExpect") SELECT "createdAt", "description", "duration", "id", "instructions", "isActive", "isBestSeller", "isFeatured", "name", "price", "serviceId", "updatedAt", "updatedBy", "whatToExpect" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE UNIQUE INDEX "Service_serviceId_key" ON "Service"("serviceId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
