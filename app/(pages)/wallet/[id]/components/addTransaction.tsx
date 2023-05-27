import React, { Fragment } from "react";
import { classNames } from "@/lib/utils";
import { FinancialTransaction } from "@/types";
import Switcher from "@/app/(pages)/wallet/[id]/components/switcher";
import InputAmount from "@/app/(pages)/wallet/[id]/components/inputAmount";
import DatePicker from "@/components/datePicker";
import Merchant from "@/app/(pages)/wallet/[id]/components/merchant";
import Notes from "@/app/(pages)/wallet/[id]/components/notes";
import PeriodicityDropdown from "@/app/(pages)/wallet/[id]/components/periodicityDropdown";
import ActionButtons from "@/app/(pages)/wallet/[id]/components/actionButtons";
import CategoriesDialog from "@/components/categoriesDialog";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Dialog, Transition } from "@headlessui/react";
import {Actions} from "@/app/(pages)/wallet/[id]/transactions";

const INITIAL_STATE: FinancialTransaction = {
  id: "0",
  type: "expense",
  amount: undefined,
  date: { startDate: null, endDate: null },
  periodicity: "One-time payment",
};
const AddTransaction = ({
  transactionToBeEdited,
  dispatch,
  showAsModal,
}: {
  transactionToBeEdited?: FinancialTransaction;
  dispatch: React.Dispatch<Actions>;
  showAsModal: boolean;
}) => {
  // If we get an expense, and it is income type or if we have no expense the default type is income
  const [transaction, setTransaction] =
    React.useState<FinancialTransaction>(INITIAL_STATE);
  const [isCategoriesOpen, setIsCategoriesOpen] =
    React.useState<boolean>(false);
  const isIncome = transaction?.type === "income" ?? "expense";

  const amountInputRef = React.useRef<null | HTMLInputElement>(null);
  React.useEffect(() => {
    if (!transactionToBeEdited) {
      setTransaction(INITIAL_STATE);
    } else {
      setTransaction(transactionToBeEdited);
    }
  }, [transactionToBeEdited]);

  function cancel() {
    console.log("Cancelling!!!!");
    dispatch({ type: "cancel" });
    //set transaction to reset state
    setTransaction(INITIAL_STATE);
  }
  function onAmountChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (!amountInputRef.current) return;
    const amountInputElement = amountInputRef.current as HTMLInputElement;
    setTransaction((t) => ({ ...t, amount: amountInputElement.value }));
  }
  function onDateChanged(date: DateValueType) {
    if (date === null) return;
    setTransaction((t) => ({ ...t, date }));
  }
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted");
    // if we are adding a new transaction we dispatch
    if (!transactionToBeEdited) {
      // there was no transaction for edit
      dispatch({
        type: "add-transaction",
        newTransaction: transaction,
        editTransaction: undefined,
      });
      console.log("Add new txn");
    } else {
      // here we dispatch an edit-transaction
      dispatch({
        type: "save-transaction",
        editTransaction: transaction,
        newTransaction: undefined,
      });
      console.log("Editing txn");
    }
    setTransaction(INITIAL_STATE);
  }
  return (
    <>
      <AddTransactionForm
        isIncome={isIncome}
        transaction={transaction}
        setTransaction={setTransaction}
        submitHandler={submitHandler}
        amountInputRef={amountInputRef}
        onAmountChanged={onAmountChanged}
        setIsCategoriesOpen={setIsCategoriesOpen}
        onDateChanged={onDateChanged}
        transactionToBeEdited={transactionToBeEdited}
        cancel={cancel}
      />
      <Transition appear show={showAsModal ?? false} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10  sm:hidden"
          onClose={() => {}}
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
                <Dialog.Panel className="w-full min-h-full max-w-md transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <AddTransactionForm
                    isIncome={isIncome}
                    transaction={transaction}
                    setTransaction={setTransaction}
                    submitHandler={submitHandler}
                    amountInputRef={amountInputRef}
                    onAmountChanged={onAmountChanged}
                    setIsCategoriesOpen={setIsCategoriesOpen}
                    onDateChanged={onDateChanged}
                    transactionToBeEdited={transactionToBeEdited}
                    cancel={cancel}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <CategoriesDialog
        isOpen={isCategoriesOpen}
        close={() => setIsCategoriesOpen(false)}
        type={isIncome ? "income" : "expense"}
        selectedCategory={transaction.category}
        setSelectedCategory={(category) =>
          setTransaction((t) => ({ ...t, category }))
        }
      />
    </>
  );
};

const AddTransactionForm = ({
  isIncome,
  transaction,
  setTransaction,
  submitHandler,
  amountInputRef,
  onAmountChanged,
  setIsCategoriesOpen,
  onDateChanged,
  transactionToBeEdited,
  cancel,
}: {
  isIncome: boolean;
  transaction: FinancialTransaction;
  setTransaction: React.Dispatch<React.SetStateAction<FinancialTransaction>>;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  amountInputRef: React.MutableRefObject<HTMLInputElement | null>;
  onAmountChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsCategoriesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDateChanged: (date: DateValueType) => void;
  transactionToBeEdited: FinancialTransaction | undefined;
  cancel: () => void;
}) => {
  return (
    <section aria-labelledby="" className="@container/section">
      <div
        className={classNames(
          isIncome ? "bg-teal-700" : "bg-red-400",
          " rounded-t-lg  shadow transition-colors duration-1000 ease-in-out h-[150px]"
        )}
      >
        <div className="mx-auto p-4 flex justify-center relative">
          <Switcher
            isIncome={transaction.type === "income"}
            setIsIncome={(isIncome) =>
              setTransaction((t) => ({
                ...t,
                type: isIncome ? "income" : "expense",
              }))
            }
          />
        </div>
      </div>
      <div className="bg-slate-50 min-h-52 rounded-b-lg shadow-lg relative">
        <form onSubmit={submitHandler}>
          <div className="relative mt-2 rounded-md shadow-sm">
            <InputAmount
              inputRef={amountInputRef}
              value={(transaction.amount as string) ?? ""}
              onChange={onAmountChanged}
              isIncome={isIncome}
              openCategories={() => setIsCategoriesOpen(true)}
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
                merchant={transaction.merchant ?? ""}
                onMerchantChanged={(e) =>
                  setTransaction((t) => ({ ...t, merchant: e.target.value }))
                }
              />
            </div>
            <div className="mt-2">
              <Notes
                notes={transaction.notes ?? ""}
                onNotesChanged={(e) =>
                  setTransaction((t) => ({ ...t, notes: e.target.value }))
                }
              />
            </div>
            <div className="mt-2">
              <PeriodicityDropdown
                value={transaction.periodicity}
                onChange={(periodicity) =>
                  setTransaction((t) => ({ ...t, periodicity }))
                }
              />
            </div>
            <div className="mt-2">
              <ActionButtons
                isIncome={isIncome}
                isEditing={!!transactionToBeEdited}
                onCancel={cancel}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTransaction;
