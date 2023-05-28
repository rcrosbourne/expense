import {FinancialTransaction} from "@/types/financialTransaction";

export type Wallet = {
    budget?: number | string | undefined;
    category: "personal" | "business";
    id:  string;
    name: string;
    href: string;
    balance: number;
    transactions: FinancialTransaction[];
};