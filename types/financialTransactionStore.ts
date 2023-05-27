import {FinancialTransaction} from "@/types/financialTransaction";

export type FinancialTransactionStore = {
  transaction: FinancialTransaction | undefined;
  openCategories: boolean;
  setOpenCategories: (openCategories: boolean) => void;
  setTransaction: (transaction: FinancialTransaction) => void;
 // editWallet: Wallet | undefined;
 //  deleteWallet: Wallet | undefined;
 //  openConfirm: boolean;
 //  confirmDelete: boolean;
 //  setConfirmDelete: (confirmDelete: boolean) => void;
 //  handleDeleteWallet: (openConfirm: boolean, wallet?: Wallet) => void;
 //  handleCancelEdit: () => void;
 //  handleEditWallet: (wallet: Wallet) => void;
};