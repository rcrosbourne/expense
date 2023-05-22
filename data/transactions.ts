import { FinancialTransaction } from "@/app/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { expenseCategories, incomeCategories } from "@/app/data/categories";
dayjs.extend(timezone);
dayjs.extend(utc);
export const transactions: FinancialTransaction[] = [
  {
    id: 1,
    amount: 10003.45,
    type: "expense",
    date: {
      startDate: dayjs().tz("America/Jamaica").subtract(2, "days").toDate(),
      endDate: dayjs().tz("America/Jamaica").subtract(2, "days").toDate(),
    },
    notes: "Lorem ipsum",
    // select a random category from expenseCategories
    category: expenseCategories[0],
    merchant: "KFC",
    periodicity: "One-time payment",
  },
  {
    id: 2,
    amount: 423.04,
    type: "expense",
    date: {
      startDate: dayjs().tz("America/Jamaica").toDate(),
      endDate: dayjs().tz("America/Jamaica").toDate(),
    },
    // select a random category from expenseCategories
    category: expenseCategories[3],
    merchant: "KFC",
    periodicity: "Every month",
  },
  {
    id: 3,
    amount: 10909.45,
    type: "expense",
    date: {
      startDate: dayjs().tz("America/Jamaica").toDate(),
      endDate: dayjs().tz("America/Jamaica").toDate(),
    },
    // select a random category from expenseCategories
    category: expenseCategories[6],
    merchant: "KFC",
    periodicity: "Every 2 months",
  },
  {
    id: 4,
    amount: 223030.45,
    type: "expense",
    date: {
      startDate: dayjs().tz("America/Jamaica").toDate(),
      endDate: dayjs().tz("America/Jamaica").toDate(),
    },
    // select a random category from expenseCategories
    category: expenseCategories[9],
    merchant: "KFC",
    periodicity: "One-time payment",
  },
  {
    id: 5,
    amount: 323030.45,
    type: "income",
    date: {
      startDate: dayjs().tz("America/Jamaica").toDate(),
      endDate: dayjs().tz("America/Jamaica").toDate(),
    },
    // select a random category from incomeCategories
    category: incomeCategories[2],
    merchant: "Medullan",
    periodicity: "One-time payment",
  },
  {
    id: 6,
    amount: 223030.45,
    type: "income",
    date: {
      startDate: dayjs().tz("America/Jamaica").toDate(),
      endDate: dayjs().tz("America/Jamaica").toDate(),
    },
    // select a random category from incomeCategories
    category: incomeCategories[4],
    merchant: "ZS Associates",
    periodicity: "One-time payment",
  },
  {
    id: 7,
    amount: 62923.45,
    type: "expense",
    date: {
      startDate: dayjs().tz("America/Jamaica").subtract(5, "days").toDate(),
      endDate: dayjs().tz("America/Jamaica").subtract(5, "days").toDate(),
    },
    // select a random category from incomeCategories
    category: expenseCategories[1],
    merchant: "PriceSmart",
    periodicity: "One-time payment",
  },
  {
    id: 8,
    amount: 12000.45,
    type: "income",
    date: {
      startDate: dayjs().tz("America/Jamaica").subtract(1, "month").toDate(),
      endDate: dayjs().tz("America/Jamaica").subtract(1, "month").toDate(),
    },
    // select a random category from incomeCategories
    category: incomeCategories[2],
    merchant: "ZS Associates",
    periodicity: "One-time payment",
  },
  {
    id: 9,
    amount: 120342.45,
    type: "income",
    date: {
      startDate: dayjs().tz("America/Jamaica").subtract(2, "month").toDate(),
      endDate: dayjs().tz("America/Jamaica").subtract(2, "month").toDate(),
    },
    // select a random category from incomeCategories
    category: incomeCategories[3],
    merchant: "ZS Associates",
    periodicity: "One-time payment",
  },
  {
    id: 10,
    amount: 120342.45,
    type: "expense",
    date: {
      startDate: dayjs().tz("America/Jamaica").subtract(2, "month").toDate(),
      endDate: dayjs().tz("America/Jamaica").subtract(2, "month").toDate(),
    },
    // select a random category from incomeCategories
    category: expenseCategories[12],
    merchant: "Pandora",
    periodicity: "One-time payment",
  },
];
