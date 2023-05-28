import "client-only";
import { create } from "zustand";
import { Wallet } from "@/types";
import {DashboardStore} from "@/types/dashboardStore";

const useStore = create<DashboardStore>()((set) => ({
  editWallet: undefined,
  deleteWallet: undefined,
  openConfirm: false,
  confirmDelete: false,
  setConfirmDelete: (confirmDelete: boolean) => set((state) => ({ ...state, confirmDelete })),
  handleDeleteWallet: (openConfirm: boolean, wallet?: Wallet) =>
    set((state) => ({ ...state, deleteWallet: wallet, openConfirm,})),
  handleCancelEdit: () => set((state) => ({ ...state, editWallet: undefined })),
  handleEditWallet: (wallet: Wallet) =>
    set((state) => ({ ...state, editWallet: wallet })),
}));
export const useEditWallet = () => useStore((state) => state.editWallet);
export const useDeleteWallet = () => useStore((state) => state.deleteWallet);
export const useOpenConfirm = () => useStore((state) => state.openConfirm);
export const useConfirmDelete = () => useStore((state) => state.confirmDelete);
export const useHandleDeleteWallet = () =>
  useStore((state) => state.handleDeleteWallet);
export const useHandleCancelEdit = () =>
  useStore((state) => state.handleCancelEdit);
export const useHandleEditWallet = () =>
    useStore((state) => state.handleEditWallet);
export const useSetConfirmDelete = () =>
  useStore((state) => state.setConfirmDelete);
