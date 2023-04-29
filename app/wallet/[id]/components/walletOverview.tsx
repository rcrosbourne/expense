import React, { Fragment } from "react";
import { walletStats } from "@/app/data/walletStatus";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "@/app/utils";
import Switcher from "@/app/wallet/[id]/components/switcher";
import InputAmount from "@/app/wallet/[id]/components/inputAmount";
import DatePicker from "@/app/components/datePicker";
import Merchant from "@/app/wallet/[id]/components/merchant";
import Notes from "@/app/wallet/[id]/components/notes";
import PeriodicityDropdown from "@/app/wallet/[id]/components/periodicityDropdown";
import ActionButtons from "@/app/wallet/[id]/components/actionButtons";
import {DateValueType} from "react-tailwindcss-datepicker/dist/types";
import {recurringPeriodicity} from "@/app/data/recurringPeriodicity";
import {AnyCategory, FinancialTransaction} from "@/app/types";

const WalletOverview = () => {
  const [showAddTransaction, setShowAddTransaction] =
    React.useState<boolean>(false);
  const [isIncome, setIsIncome] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [periodicity, setPeriodicity] = React.useState(recurringPeriodicity[0]);
  const [isCategoriesOpen, setIsCategoriesOpen] =
    React.useState<boolean>(false);
  const [isEditingTransaction, setIsEditingTransaction] =
    React.useState<boolean>(false);
  const [editTransaction, setEditTransaction] =
    React.useState<FinancialTransaction | null>(null);
  const [merchant, setMerchant] = React.useState<string | undefined>("");
  const [notes, setNotes] = React.useState<string | undefined>("");
  const [category, setCategory] = React.useState<AnyCategory | undefined>(
    undefined
  );
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [transactionToBeDeleted, setTransactionToBeDeleted] = React.useState<
    FinancialTransaction | undefined
  >(undefined);
  const amountInputRef = React.useRef();
  const transactionRef = React.useRef(null);
  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Wallet Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0"></div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  My Personal Wallet
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl"></p>
                <p className="text-sm font-medium text-gray-600"></p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button
                type="button"
                onClick={() => setShowAddTransaction(true)}
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:hidden hover:bg-gray-50"
              >
                Add Expense / Income
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
            <span className="text-gray-400 text-xs">Total</span>
            <span className="text-gray-900 text-xl">
              {walletStats.total}
            </span>{" "}
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
            <span className="text-gray-400 text-xs">Last 30 days</span>
            <span className="text-gray-900 text-xl">
              {walletStats.lastThirtyDays}
            </span>{" "}
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
            <span className="text-gray-400 text-xs">Last 7 days</span>
            <span className="text-gray-900 text-xl">
              {walletStats.lastSevenDays}
            </span>{" "}
          </div>
        </div>
      </div>
      <Transition appear show={showAddTransaction} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowAddTransaction(false)}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full min-h-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <section aria-labelledby="" className="@container/section">
                    <div
                      className={classNames(
                        isIncome ? "bg-teal-700" : "bg-red-400",
                        " rounded-t-lg  shadow transition-colors duration-1000 ease-in-out h-[150px]"
                      )}
                    >
                      <div className="mx-auto p-4 flex justify-center relative">
                        <Switcher
                          isIncome={isIncome}
                          setIsIncome={setIsIncome}
                        />
                      </div>
                    </div>
                    <div className="bg-slate-50 min-h-52 rounded-b-lg shadow-lg relative">
                      <form onSubmit={() => {}}>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <InputAmount
                            inputRef={amountInputRef}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            isIncome={isIncome}
                            openCategories={() => {}}
                            category={category}
                          />
                        </div>
                        <div className="p-4 space-y-8">
                          <div className="mt-2">
                            <DatePicker
                              useRange={false}
                              asSingle={true}
                              value={dueDate}
                              onDateChanged={() => {}}
                            />
                          </div>
                          <div className="mt-2">
                            <Merchant
                              merchant={merchant ?? ""}
                              onMerchantChanged={(e) =>
                                setMerchant(e.target.value)
                              }
                            />
                          </div>
                          <div className="mt-2">
                            <Notes
                              notes={notes ?? ""}
                              onNotesChanged={(e) => setNotes(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <PeriodicityDropdown
                              value={periodicity}
                              onChange={setPeriodicity}
                            />
                          </div>
                          <div className="mt-2">
                            <ActionButtons
                              isIncome={isIncome}
                              isEditing={isEditingTransaction}
                              onCancel={() => {}}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};
export default WalletOverview;
