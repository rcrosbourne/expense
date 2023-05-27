import {AnyCategory, FinancialTransaction as FinancialTransactionType, Periodicity} from "@/types";
import {FinancialTransaction, TransactionCategory} from "@prisma/client";
import {getCategoryStyle} from "./getCategoryStyle";
import dayjs from "dayjs";

type DbTxn = FinancialTransaction & { category: TransactionCategory };
export function convertDBTxnToWidget(
  transaction: DbTxn
): FinancialTransactionType {
  return {
    id: transaction.id,
    type: transaction.type,
    date: {startDate: dayjs(transaction.date).toDate(), endDate: dayjs(transaction.date).toDate()},
    periodicity: transaction.periodicity as Periodicity,
    amount: transaction.amount.toNumber(),
    merchant: transaction.merchant,
    notes: transaction.notes,
    category: {
      ...getCategoryStyle(transaction.type, transaction.category),
    } as AnyCategory,
  };
}
