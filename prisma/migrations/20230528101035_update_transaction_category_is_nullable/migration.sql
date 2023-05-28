-- DropForeignKey
ALTER TABLE "financial_transactions" DROP CONSTRAINT "financial_transactions_transaction_category_id_fkey";

-- AlterTable
ALTER TABLE "financial_transactions" ALTER COLUMN "transaction_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_transaction_category_id_fkey" FOREIGN KEY ("transaction_category_id") REFERENCES "transaction_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
