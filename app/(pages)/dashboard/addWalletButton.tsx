"use client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from "react-number-format";
import { Wallet } from "../../../types";
import useWindowSize from "@/hooks/useWindowSize";
import {useEditWallet, useHandleCancelEdit} from "@/lib/store/walletStore";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {walletSchemaValidator} from "@/lib/validations/wallet";
import WalletForm from "@/app/(pages)/dashboard/components/walletForm";

const AddWalletButton = () => {
  const [addWalletOpen, setAddWalletOpen] = React.useState(false);
  return (
    <>
      <button
        className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:hidden"
        onClick={() => setAddWalletOpen(true)}
      >
        Add Wallet
      </button>
      <AddWalletModal
        open={addWalletOpen}
        setOpen={setAddWalletOpen}
      />
    </>
  );
};
const AddWalletModal = ({open, setOpen,}: { open: boolean; setOpen: (open: boolean) => void; }) => {
  const windowSize = useWindowSize();
  const editWallet = useEditWallet();
  const editMode = !!editWallet;

  const handleCancelEdit = useHandleCancelEdit();

  React.useEffect(() => {
    if (editWallet === undefined || windowSize.width > 640) return;
    setOpen(true);
  }, [editWallet, setOpen, windowSize]);
  function onClose() {
    setOpen(false);
    handleCancelEdit();
  }
  function onSubmitCallback() {
    setOpen(false);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 sm:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:p-6">
                {/* Close button */}
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-left sm:ml-4 sm:mt-0">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-slate-900"
                    >
                      {editMode ? "Edit Wallet" : "Add Wallet"}
                    </Dialog.Title>
                    <div className="mt-2">
                     <WalletForm onSubmitCallback={() => onSubmitCallback()}/>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddWalletButton;