"use client";
import React from "react";
import { useEditWallet, useHandleCancelEdit } from "@/lib/store/walletStore";
import WalletForm from "@/app/(pages)/dashboard/components/walletForm";

const AddWallet = () => {
  const editMode = !!useEditWallet();
  return (
    <section aria-labelledby="add-wallet-title" className="hidden sm:block">
      <div className="overflow-hidden rounded-lg bg-slate-50 shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-slate-900"
            id="add-wallet-title"
          >
            {editMode ? "Edit Wallet" : "Add Wallet"}
          </h2>
          <WalletForm />
        </div>
      </div>
      {/*<DevTool control={control} />*/}
    </section>
  );
};
export default AddWallet;
