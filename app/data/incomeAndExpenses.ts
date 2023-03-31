import { Expense } from "@/app/types/expense";
import dayjs from "dayjs";
import { expenseCategories, incomeCategories } from "@/app/data/categories";

export const incomeAndExpenses: Expense[] = [
  {
    id: 1,
    amount: 10003.45,
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[0],
    merchant: "KFC",
    isRecurring: false,
  },
  {
    id: 2,
    amount: 423.04,
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[3],
    merchant: "KFC",
    isRecurring: true,
  },
  {
    id: 3,
    amount: 10909.45,
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[6],
    merchant: "KFC",
    isRecurring: true,
  },
  {
    id: 4,
    amount: 223030.45,
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from expenseCategories
    category: expenseCategories[9],
    merchant: "KFC",
    isRecurring: false,
  },
  {
    id: 5,
    amount: 323030.45,
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from incomeCategories
    category: incomeCategories[2],
    merchant: "Medullan",
    isRecurring: false,
  },
  {
    id: 6,
    amount: 223030.45,
    date: dayjs().format("MMMM DD, YYYY"),
    // select a random category from incomeCategories
    category: incomeCategories[4],
    merchant: "ZS Associates",
    isRecurring: false,
  },
];
