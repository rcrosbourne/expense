import { AnyCategory, Periodicity } from "@/types";
import { TransactionCategory, FinancialTransaction } from "@prisma/client";
import { FinancialTransaction as FinancialTransactionType } from "@/types";
import { getCategoryStyle } from "./getCategoryStyle";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

type DbTxn = FinancialTransaction & { category: TransactionCategory };
export function convertDBTxnToWidget(
  transaction: DbTxn
): FinancialTransactionType {
  const tt = {
    id: transaction.id,
    type: transaction.type,
    date: { startDate: transaction.date, endDate: null } as DateValueType,
    periodicity: transaction.periodicity as Periodicity,
    amount: transaction.amount.toNumber(),
    merchant: transaction.merchant,
    notes: transaction.notes,
    category: {
      ...getCategoryStyle(transaction.type, transaction.category),
    } as AnyCategory,
  };
  console.log({ transaction, tt });
  return tt;
}
