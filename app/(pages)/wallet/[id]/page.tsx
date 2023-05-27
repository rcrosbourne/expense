import React from "react";
import Transactions from "@/app/(pages)/wallet/[id]/transactions";
import { getTransactions } from "@/lib/server/transactionFunctions";
import { getWallet, getWallets } from "@/lib/server/walletFunctions";
import { z } from "zod";
// import { transactions } from "@/data/transactions";
import {
  AnyCategory,
  Category,
  FinancialTransaction,
  Periodicity,
} from "@/types";
import { MealIcon } from "@/components/icons";
import { convertDBTxnToWidget } from "@/lib/utils/convertDBTxnToWidget";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
const Page = async (context: z.infer<typeof routeContextSchema>) => {
  const {
    params: { id },
  } = routeContextSchema.parse(context);
  const wallet = await getWallet(id);
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  const transactions = await getTransactions({
    ...wallet,
    budget: wallet.budget.toNumber(),
  });
  console.log(JSON.stringify(transactions, null, 2));
  const updatedTransactions = transactions.map((transaction) => {
    return convertDBTxnToWidget(transaction) as FinancialTransaction;
  });
  return (
    <>
      <Transactions transactions={updatedTransactions} walletBudget={wallet.budget.toNumber()}/>
    </>
  );
};
export default Page;
