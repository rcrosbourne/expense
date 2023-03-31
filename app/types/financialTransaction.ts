import {Category} from "@/app/types/category";
import {Periodicity} from "@/app/types/periodicity";
export type Expense = {
    id: number;
    amount: number;
    date: string;
    merchant: string;
    category:Category;
    periodicity: Periodicity;
}