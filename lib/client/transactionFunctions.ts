import { FinancialTransaction } from "@/types";

const TRANSACTION_API_URL: string = "/api/wallet/:id/transaction";
async function Store(transaction: FinancialTransaction) {
  return await fetch(TRANSACTION_API_URL.replace(":id", transaction.walletId), {
    method: "POST",
    body: JSON.stringify(transaction),
  });
}
async function Update(transaction: FinancialTransaction) {
    return await fetch(
        TRANSACTION_API_URL.replace(":id", transaction.walletId) +
        "/" +
        transaction.id,
        {
            method: "PATCH",
            body: JSON.stringify(transaction),
        }
    );
}
async function Destroy(transaction: FinancialTransaction) {
  return await fetch(
    TRANSACTION_API_URL.replace(":id", transaction.walletId) +
      "/" +
      transaction.id,
    {
      method: "DELETE",
    }
  );
}

export const TransactionFunctions = { Store, Update, Destroy };
