import { convertDBTxnToWidget } from "@/lib/utils/convertDBTxnToWidget";
import { Wallet } from "@/types";
import {
  Wallet as RawWallet,
  FinancialTransaction as RawTransaction,
  TransactionCategory as RawTransactionCategory,
} from "@prisma/client";

type WalletWithTxn = RawWallet & {
  transactions: (RawTransaction & { category: RawTransactionCategory | null })[];
};

const walletHref = "/wallet/";
export function convertFromRawToWallet(wallet: WalletWithTxn): Wallet {
  const balance = calculateWalletBalance(wallet.budget.toNumber(), wallet.transactions);
  return {
    id: wallet.id,
    name: wallet.name,
    category: wallet.category,
    href: walletHref + wallet.id,
    budget: wallet.budget.toNumber(),
    balance,
    transactions: wallet.transactions.map((txn) => convertDBTxnToWidget(txn, wallet.id)),
  };
}

function calculateWalletBalance(budget: number, transactions: RawTransaction[]): number {
  // If transaction is income, add to balance (positive) else subtract from balance (negative)
  return transactions.reduce((balance, txn) => {
    if (txn.type === "income") {
      return balance + txn.amount.toNumber();
    } else {
      return balance - txn.amount.toNumber();
    }
  }, budget);
}
