import {Category, Periodicity} from "@/app/types";
export type FinancialTransaction = {
    id: number;
    type: "income" | "expense";
    amount: number;
    periodicity: Periodicity;
    date: string;
    merchant?: string;
    notes?: string;
    category?:Category;
}