-- CreateEnum
CREATE TYPE "ApiScope" AS ENUM ('READ_API_KEY', 'WRITE_API_KEY', 'MODIFY_API_KEY', 'SERVERS_VIEW', 'SERVERS_MANAGE', 'RECEIVE_NONCE', 'ADMIN');

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" SERIAL NOT NULL,
    "for" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3),
    "scopes" "ApiScope"[],
    "note" TEXT,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nonce" (
    "id" SERIAL NOT NULL,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "Nonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_for_key" ON "ApiKey"("for");

-- CreateIndex
CREATE UNIQUE INDEX "Nonce_nonce_key" ON "Nonce"("nonce");
