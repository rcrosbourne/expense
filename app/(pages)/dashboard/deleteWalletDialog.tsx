import React from "react";
import ConfirmDialog from "@/app/components/confirmDialog";
import {
  useDeleteWallet,
  useHandleDeleteWallet,
  useOpenConfirm,
} from "@/lib/store/walletStore";
import { useMutation } from "@tanstack/react-query";
import { WalletFunctions } from "@/lib/client/walletFunctions";
import {useRouter} from "next/navigation";

const DeleteWalletDialog = () => {
  const handleDeleteWallet = useHandleDeleteWallet();
  const deleteWallet = useDeleteWallet();
  const openConfirm = useOpenConfirm();
  const router = useRouter();
  const {mutateAsync, isLoading} = useMutation(["wallets", deleteWallet?.id], {
    mutationFn: WalletFunctions.Destroy,
    onError: (error) => {
      // TODO: Add logging.
      console.error(error);
    },
    onSuccess: async () => {
      handleDeleteWallet(false, undefined);
      router.refresh();
    },
  });
  const onConfirm = async (deleteConfirmed: boolean) => {
    if (deleteConfirmed && deleteWallet) {
      void mutateAsync(deleteWallet.id);
    }
    handleDeleteWallet(false, deleteWallet);
  };
  return (
    <ConfirmDialog
      openConfirm={openConfirm}
      setOpenConfirm={(isOpen) => handleDeleteWallet(isOpen, deleteWallet)}
      title={"Delete Wallet"}
      message={`You are about to delete "${deleteWallet?.name}" wallet. This action cannot be undone.`}
      confirmButtonText={"Delete"}
      cancelButtonText={"Cancel"}
      confirm={onConfirm}
      disableButtons={isLoading}
    />
  );
};
export default DeleteWalletDialog;
