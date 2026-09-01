-- CreateIndex
CREATE INDEX "Bookmark_userId_isArchived_createdAt_idx" ON "Bookmark"("userId", "isArchived", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Bookmark_userId_pinned_idx" ON "Bookmark"("userId", "pinned");
