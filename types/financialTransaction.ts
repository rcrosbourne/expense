import { AnyCategory, Periodicity } from "@/types/index";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
export type FinancialTransaction = {
  id: string;
  type: "income" | "expense";
  amount: number | string | undefined;
  periodicity: Periodicity;
  date: DateValueType;
  merchant?: string | null;
  notes?: string | null;
  category?: AnyCategory;
};
