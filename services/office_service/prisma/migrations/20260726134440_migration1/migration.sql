-- CreateTable
CREATE TABLE "office" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "location" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
