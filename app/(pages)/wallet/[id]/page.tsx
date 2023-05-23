import React from "react";
import Transactions from "@/app/(pages)/wallet/[id]/transactions";
import { getTransactions } from "@/lib/server/transactionFunctions";
import { getWallet, getWallets } from "@/lib/server/walletFunctions";
import { z } from "zod";
// import { transactions } from "@/data/transactions";
import { AnyCategory, Category, Periodicity } from "@/types";
import { MealIcon } from "@/components/icons";

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
    return {
      id: transaction.id,
      type: transaction.type,
      date: { startDate: transaction.date, endDate: null },
      periodicity: transaction.periodicity as Periodicity,
      amount: transaction.amount.toNumber(),
      category: {
        id: transaction.category.id,
        name: transaction.category.name,
        foregroundColor: "text-slate-900" as "text-slate-900",
        backgroundColor: "bg-slate-300" as "bg-slate-300",
        backgroundColorAsHsl: "hsl(212.7,26.8%,83.9%)" as "hsl(212.7,26.8%,83.9%)",
        foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)" as "hsl(222.2,47.4%,11.2%)",
        icon: <MealIcon />,
      },
    };
  });
  return (
    <>
      <Transactions transactions={updatedTransactions}/>
    </>
  );
};
export default Page;
