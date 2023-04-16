"use client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from "react-number-format";

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
      <AddWalletModal open={addWalletOpen} setOpen={setAddWalletOpen} />
    </>
  );
};
export default AddWalletButton;
const AddWalletModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 sm:hidden"
        onClose={() => {
          setOpen(false);
        }}
      >
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                    onClick={() => setOpen(false)}
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
                      Add Wallet
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-6 flow-root">
                          <div className="flex flex-col">
                            <label
                              htmlFor="walletName"
                              className="text-sm font-medium text-slate-700"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="walletName"
                              id="walletName"
                              className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                            />
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              htmlFor="walletCategory"
                              className="text-sm font-medium text-slate-700"
                            >
                              Category
                            </label>
                            <select
                              id="walletCategory"
                              name="walletCategory"
                              className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                            >
                              <option value="personal">Personal</option>
                              <option value="business">Business</option>
                            </select>
                          </div>
                          <div className="flex flex-col mt-4">
                            <label
                              htmlFor="walletBudget"
                              className="text-sm font-medium text-slate-700"
                            >
                              Budget
                            </label>
                            <NumericFormat
                              displayType="input"
                              type="text"
                              name="budget"
                              id="budget"
                              className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                              placeholder="0.00"
                              thousandSeparator=","
                              allowNegative={false}
                              maxLength={18}
                              decimalScale={2}
                              fixedDecimalScale
                              // onChange={(e) => {  setWallet({ ...wallet, budget: parseFloat(e.target.value) })}}
                              // value={wallet?.budget}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <button
                            onClick={() => {
                              setOpen(false);
                            }}
                            type="submit"
                            className="flex w-full items-center justify-center rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-300 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-500"
                          >
                            Save
                          </button>
                        </div>
                      </form>
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