/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `transaction_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transaction_categories_name_type_key" ON "transaction_categories"("name", "type");
