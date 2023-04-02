import {Category} from "@/app/types/category";
import {Periodicity} from "@/app/types/periodicity";
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