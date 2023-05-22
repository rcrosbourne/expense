import {AnyCategory, Periodicity} from "@/types/index";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";
export type FinancialTransaction = {
    id: number;
    type: "income" | "expense";
    amount: number | string | undefined;
    periodicity: Periodicity;
    date: DateValueType;
    merchant?: string;
    notes?: string;
    category?:AnyCategory;
}