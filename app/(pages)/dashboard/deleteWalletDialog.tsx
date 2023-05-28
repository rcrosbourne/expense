import React from "react";
import ConfirmDialog from "@/components/confirmDialog";
import {
  useDeleteWallet,
  useHandleDeleteWallet,
  useOpenConfirm,
} from "@/lib/store/walletStore";
import {useMutation} from "@tanstack/react-query";
import { WalletFunctions } from "@/lib/client/walletFunctions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

const DeleteWalletDialog = () => {
  const handleDeleteWallet = useHandleDeleteWallet();
  const deleteWallet = useDeleteWallet();
  const openConfirm = useOpenConfirm();
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync, isLoading } = useMutation(
    ["wallets", deleteWallet?.id],
    {
      mutationFn: WalletFunctions.Destroy,
      onError: (error) => {
        // TODO: Add logging.
        console.error(error);
        toast({
          title: "An error occurred",
          description: "This action cannot be completed as this time.",
          variant: "destructive",
        });
      },
      onSuccess: async () => {
        handleDeleteWallet(false, undefined);
        toast({
          title: "Wallet deleted",
          description: "Wallet deleted successfully",
          variant: "default",
        });
        router.refresh();
      },
    }
  );
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
