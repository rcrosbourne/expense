import {Category} from "@/app/types/category";
import {Periodicity} from "@/app/types/periodicity";
export type FinancialTransaction = {
    id: number;
    type: "income" | "expense";
    amount: number;
    date: string;
    merchant: string;
    category:Category;
    periodicity: Periodicity;
}