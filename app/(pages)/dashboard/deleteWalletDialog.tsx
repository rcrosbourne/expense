import React from "react";
import ConfirmDialog from "@/app/components/confirmDialog";
import {useDeleteWallet, useHandleDeleteWallet, useOpenConfirm} from "@/lib/walletStore";

const DeleteWalletDialog = () => {
  const handleDeleteWallet = useHandleDeleteWallet();
  const deleteWallet = useDeleteWallet();
  const openConfirm = useOpenConfirm();
  return (
    <ConfirmDialog
      openConfirm={openConfirm}
      setOpenConfirm={(isOpen) => handleDeleteWallet(isOpen, deleteWallet)}
      title={"Delete Wallet"}
      message={`You are about to delete "${deleteWallet?.name}"`}
      confirmButtonText={"Delete"}
      cancelButtonText={"Cancel"}
      confirm={() => handleDeleteWallet(false, deleteWallet)}
    />
  );
};
export default DeleteWalletDialog;
