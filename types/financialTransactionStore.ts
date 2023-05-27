import {FinancialTransaction} from "@/types/financialTransaction";

export type FinancialTransactionStore = {
  transaction: FinancialTransaction | undefined;
  deleteTransaction: FinancialTransaction | undefined;
  showAsModal: boolean;
  openCategories: boolean;
  openDeleteModal: boolean;
  setOpenCategories: (openCategories: boolean) => void;
  setTransaction: (transaction: FinancialTransaction) => void;
  setDeleteTransaction: (transaction: FinancialTransaction) => void;
  setOpenDeleteModal: (openDeleteModal: boolean) => void;
  setShowAsModal: (openAddTransactionAsModal: boolean) => void;
};