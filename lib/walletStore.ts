import { create } from "zustand";
import { Wallet } from "@/app/types";
type DashboardStore = {
  editWallet: Wallet | undefined;
  deleteWallet: Wallet | undefined;
  openConfirm: boolean;
  handleDeleteWallet: (openConfirm: boolean, wallet?: Wallet) => void;
  handleCancelEdit: () => void;
  handleEditWallet: (wallet: Wallet) => void;
};
const useStore = create<DashboardStore>()((set) => ({
  editWallet: undefined,
  deleteWallet: undefined,
  openConfirm: false,
  handleDeleteWallet: (openConfirm: boolean, wallet?: Wallet) =>
    set((state) => ({ ...state, deleteWallet: wallet, openConfirm })),
  handleCancelEdit: () => set((state) => ({ ...state, editWallet: undefined })),
  handleEditWallet: (wallet: Wallet) =>
    set((state) => ({ ...state, editWallet: wallet })),
}));

export const useEditWallet = () => useStore((state) => state.editWallet);
export const useDeleteWallet = () => useStore((state) => state.deleteWallet);
export const useOpenConfirm = () => useStore((state) => state.openConfirm);
export const useHandleDeleteWallet = () =>
  useStore((state) => state.handleDeleteWallet);
export const useHandleCancelEdit = () =>
  useStore((state) => state.handleCancelEdit);
export const useHandleEditWallet = () =>
  useStore((state) => state.handleEditWallet);
