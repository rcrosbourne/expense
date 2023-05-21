/*
  Warnings:

  - Added the required column `category` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "category" TEXT NOT NULL;
