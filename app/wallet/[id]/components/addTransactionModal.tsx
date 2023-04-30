import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { classNames } from "@/app/utils";
import Switcher from "@/app/wallet/[id]/components/switcher";
import InputAmount from "@/app/wallet/[id]/components/inputAmount";
import DatePicker from "@/app/components/datePicker";
import Merchant from "@/app/wallet/[id]/components/merchant";
import Notes from "@/app/wallet/[id]/components/notes";
import PeriodicityDropdown from "@/app/wallet/[id]/components/periodicityDropdown";
import ActionButtons from "@/app/wallet/[id]/components/actionButtons";
import { FinancialTransaction } from "@/app/types";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

const INITIAL_STATE: FinancialTransaction = {
  id: 0,
  type: "income",
  amount: 0,
  category: undefined,
  date: { startDate: new Date(), endDate: null },
  merchant: "",
  notes: "",
  periodicity: "Every month",
};
const AddTransactionModal = ({
  show,
  isIncome,
}: {
  show: boolean;
  isIncome: boolean;
}) => {
  const [transaction, setTransaction] =
    React.useState<FinancialTransaction>(INITIAL_STATE);
  const amountInputRef = React.useRef();
  function onAmountChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (!amountInputRef.current) return;
    const input = amountInputRef.current as HTMLInputElement;
    setTransaction((t) => ({ ...t, amount: parseFloat(input.value) }));
  }
  function onDateChanged(e: DateValueType) {
    setTransaction((t) => ({ ...t, date: e }));
  }
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10  sm:hidden" onClose={() => {}}>
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
                      <Switcher isIncome={isIncome} setIsIncome={() => {}} />
                    </div>
                  </div>
                  <div className="bg-slate-50 min-h-52 rounded-b-lg shadow-lg relative">
                    <form onSubmit={() => {}}>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <InputAmount
                          inputRef={amountInputRef}
                          value={transaction.amount.toString()}
                          onChange={onAmountChanged}
                          isIncome={isIncome}
                          openCategories={() => {}}
                          category={transaction.category}
                        />
                      </div>
                      <div className="p-4 space-y-8">
                        <div className="mt-2">
                          <DatePicker
                            useRange={false}
                            asSingle={true}
                            value={transaction.date}
                            onDateChanged={onDateChanged}
                          />
                        </div>
                        <div className="mt-2">
                          <Merchant
                            merchant={transaction.merchant || ""}
                            onMerchantChanged={(e) =>
                              setTransaction((t) => ({
                                ...t,
                                merchant: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mt-2">
                          <Notes
                            notes={transaction.notes || ""}
                            onNotesChanged={(e) =>
                              setTransaction((t) => ({
                                ...t,
                                notes: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mt-2">
                          <PeriodicityDropdown
                            value={transaction.periodicity}
                            onChange={(e) =>
                              setTransaction((t) => ({ ...t, periodicity: e }))
                            }
                          />
                        </div>
                        <div className="mt-2">
                          <ActionButtons
                            isIncome={isIncome}
                            isEditing={false}
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
  );
};

export default AddTransactionModal;
