/*
  Warnings:

  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Primeiro adiciona a coluna como nullable
ALTER TABLE "user" ADD COLUMN "password" TEXT;

-- Atualiza registros existentes com uma senha temporária hasheada (123456)
UPDATE "user" SET "password" = '$2a$10$rVGhCQWjOWfr4bMdgYk1qe6yPnXQS8t.XQQ8X7d2zTvA6V2oKf1am' WHERE "password" IS NULL;

-- Agora torna a coluna NOT NULL
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;
