import {AnyCategory, Periodicity, Wallet} from "@/types/index";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
export type FinancialTransaction = {
  id: string;
  walletId: string;
  type: "income" | "expense";
  amount: number | string;
  periodicity: Periodicity;
  date: DateValueType;
  merchant?: string | null;
  notes?: string | null;
  category?: AnyCategory;
};
