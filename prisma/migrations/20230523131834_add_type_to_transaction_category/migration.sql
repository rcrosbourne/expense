/*
  Warnings:

  - Added the required column `type` to the `transaction_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_categories" ADD COLUMN     "type" "TransactionType" NOT NULL;
