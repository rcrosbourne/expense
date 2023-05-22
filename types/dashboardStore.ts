import {Wallet} from "@/app/types/wallet";

export type DashboardStore = {
  editWallet: Wallet | undefined;
  deleteWallet: Wallet | undefined;
  openConfirm: boolean;
  confirmDelete: boolean;
  setConfirmDelete: (confirmDelete: boolean) => void;
  handleDeleteWallet: (openConfirm: boolean, wallet?: Wallet) => void;
  handleCancelEdit: () => void;
  handleEditWallet: (wallet: Wallet) => void;
};