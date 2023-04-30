import {AnyCategory, Periodicity} from "@/app/types";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";
export type FinancialTransaction = {
    id: number;
    type: "income" | "expense";
    amount: number | string;
    periodicity: Periodicity;
    date: DateValueType;
    merchant?: string;
    notes?: string;
    category?:AnyCategory;
}