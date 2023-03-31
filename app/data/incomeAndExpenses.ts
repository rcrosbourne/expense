import { FinancialTransaction } from "@/app/types/financialTransaction";
import dayjs from "dayjs";
import { expenseCategories, incomeCategories } from "@/app/data/categories";

export const incomeAndExpenses: FinancialTransaction[] = [
  {
    id: 1,
    amount: 10003.45,
    type: "expense",
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[0],
    merchant: "KFC",
    periodicity: "One-time payment",
  },
  {
    id: 2,
    amount: 423.04,
    type: "expense",
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[3],
    merchant: "KFC",
    periodicity: "Every month",
  },
  {
    id: 3,
    amount: 10909.45,
    type: "expense",
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[6],
    merchant: "KFC",
    periodicity: "Every 2 months",
  },
  {
    id: 4,
    amount: 223030.45,
    type: "expense",
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[9],
    merchant: "KFC",
    periodicity: "One-time payment",
  },
  {
    id: 5,
    amount: 323030.45,
    type: "income",
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from incomeCategories
    category: incomeCategories[2],
    merchant: "Medullan",
    periodicity: "One-time payment",
  },
  {
    id: 6,
    amount: 223030.45,
    type: "income",
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from incomeCategories
    category: incomeCategories[4],
    merchant: "ZS Associates",
    periodicity: "One-time payment",
  },
];
