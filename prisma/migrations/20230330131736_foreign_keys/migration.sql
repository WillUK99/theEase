-- CreateIndex
CREATE INDEX "providerAccountId" ON "Account"("providerAccountId");

-- CreateIndex
CREATE INDEX "serviceId" ON "Addon"("serviceId");

-- CreateIndex
CREATE INDEX "userId" ON "Session"("userId");
