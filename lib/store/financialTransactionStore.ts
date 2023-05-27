import "client-only";
import { create } from "zustand";
import { FinancialTransaction } from "@/types";
import {FinancialTransactionStore} from "@/types/financialTransactionStore";

const useStore = create<FinancialTransactionStore>()((set) => ({
    transaction: undefined,
    openCategories: false,
    setOpenCategories: (openCategories: boolean) => set((state) => ({ ...state, openCategories })),
    setTransaction: (transaction: FinancialTransaction) => set((state) => ({ ...state, transaction })),
}));
export const useTransaction = () => useStore((state) => state.transaction);
export const useOpenCategories = () => useStore((state) => state.openCategories);
export const useSetOpenCategories = () => useStore((state) => state.setOpenCategories);
export const useSetTransaction = () => useStore((state) => state.setTransaction);