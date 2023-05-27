import "client-only";
import { create } from "zustand";
import { FinancialTransaction } from "@/types";
import {FinancialTransactionStore} from "@/types/financialTransactionStore";

const useStore = create<FinancialTransactionStore>()((set) => ({
    transaction: undefined,
    isEditing: false,
    deleteTransaction: undefined,
    openCategories: false,
    openDeleteModal: false,
    showAsModal: false,
    setDeleteTransaction: (deleteTransaction: FinancialTransaction) => set((state) => ({ ...state, deleteTransaction })),
    setOpenCategories: (openCategories: boolean) => set((state) => ({ ...state, openCategories })),
    setTransaction: (transaction: FinancialTransaction) => set((state) => ({ ...state, transaction })),
    setOpenDeleteModal: (openDeleteModal: boolean) => set((state) => ({ ...state, openDeleteModal })),
    setShowAsModal: (showAsModal: boolean) => set((state) => ({ ...state, showAsModal })),
    setIsEditing: (isEditing: boolean) => set((state) => ({ ...state, isEditing })),
}));
export const useTransaction = () => useStore((state) => state.transaction);
export const useIsEditing = () => useStore((state) => state.isEditing);
export const useDeleteTransaction = () => useStore((state) => state.deleteTransaction);
export const useOpenCategories = () => useStore((state) => state.openCategories);
export const useOpenDeleteModal = () => useStore((state) => state.openDeleteModal);
export const useSetOpenCategories = () => useStore((state) => state.setOpenCategories);
export const useSetOpenDeleteModal = () => useStore((state) => state.setOpenDeleteModal);
export const useSetTransaction = () => useStore((state) => state.setTransaction);
export const useSetDeleteTransaction = () => useStore((state) => state.setDeleteTransaction);
export const useShowAsModal = () => useStore((state) => state.showAsModal);
export const useSetShowAsModal = () => useStore((state) => state.setShowAsModal);
export const useSetIsEditing = () => useStore((state) => state.setIsEditing);
