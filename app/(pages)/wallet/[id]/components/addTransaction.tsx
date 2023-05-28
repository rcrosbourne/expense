import React, { Fragment } from "react";
import { classNames } from "@/lib/utils";
import { FinancialTransaction, Wallet } from "@/types";
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
import {
  useIsEditing,
  useOpenCategories,
  useSetIsEditing,
  useSetOpenCategories,
  useSetShowAsModal,
  useSetTransaction,
  useShowAsModal,
  useTransaction,
} from "@/lib/store/financialTransactionStore";
import { useMutation } from "@tanstack/react-query";
import { TransactionFunctions } from "@/lib/client/transactionFunctions";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const AddTransaction = ({ wallet }: { wallet: Wallet }) => {
  const INITIAL_STATE: FinancialTransaction = {
    id: "0",
    type: "expense",
    amount: undefined,
    date: { startDate: null, endDate: null },
    periodicity: "One-time payment",
    walletId: wallet.id,
  };
  // If we get an expense, and it is income type or if we have no expense the default type is income
  const transaction = useTransaction() || INITIAL_STATE;
  const setTransaction = useSetTransaction();
  const isCategoriesOpen = useOpenCategories();
  const setOpenCategories = useSetOpenCategories();
  const isIncome = transaction?.type === "income" ?? "expense";
  const showAsModal = useShowAsModal();
  const setShowAsModal = useSetShowAsModal();
  const setIsEditing = useSetIsEditing();
  const isEditing = useIsEditing();
  const { toast } = useToast();
  const router = useRouter();
  const amountInputRef = React.useRef<null | HTMLInputElement>(null);
  const { mutate, isLoading: createIsLoading } = useMutation(
    ["transaction", wallet.id],
    {
      mutationFn: TransactionFunctions.Store,
      onSuccess: async () => {
        setIsEditing(false);
        setTransaction(INITIAL_STATE);
        setShowAsModal(false);
        toast({
          title: "Transaction added",
          description: "Transaction has been added successfully",
        });
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    }
  );
  const { mutate: updateTransaction, isLoading: updateIsLoading } = useMutation(
    ["transaction", wallet.id],
    {
      mutationFn: TransactionFunctions.Update,
      onSuccess: async () => {
        setIsEditing(false);
        setTransaction(INITIAL_STATE);
        setShowAsModal(false);
        toast({
          title: "Transaction updated",
          description: "Transaction has been updated successfully",
        });
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    }
  );
  const isLoading = createIsLoading || updateIsLoading;
  function cancel() {
    console.log("Cancelling!");
    setIsEditing(false);
    setTransaction(INITIAL_STATE);
    setShowAsModal(false);
  }
  function onAmountChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (!amountInputRef.current) return;
    const amountInputElement = amountInputRef.current as HTMLInputElement;
    setTransaction({
      ...transaction,
      amount: Number(amountInputElement.value.replace(/,/g, "").trim()),
    });
  }
  function onDateChanged(date: DateValueType) {
    if (date === null) return;
    setTransaction({ ...transaction, date });
  }
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!transaction.amount) throw new Error("Amount is required");
    // set defaults
    if (!transaction.date) {
      const today = new Date();
      setTransaction({
        ...transaction,
        date: { startDate: today, endDate: today },
      });
    }
    if (isEditing) {
      updateTransaction(transaction);
    } else {
      mutate(transaction);
    }
  }
  return (
    <>
      <AddTransactionForm
        isIncome={isIncome}
        submitHandler={submitHandler}
        amountInputRef={amountInputRef}
        onAmountChanged={onAmountChanged}
        onDateChanged={onDateChanged}
        cancel={cancel}
        wallet={wallet}
        isLoading={isLoading}
      />
      <Transition appear show={showAsModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10  sm:hidden"
          onClose={() => {}}
          unmount={false}
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
                    submitHandler={submitHandler}
                    amountInputRef={amountInputRef}
                    onAmountChanged={onAmountChanged}
                    onDateChanged={onDateChanged}
                    cancel={cancel}
                    wallet={wallet}
                    isLoading={isLoading}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <CategoriesDialog
        isOpen={isCategoriesOpen}
        close={() => setOpenCategories(false)}
        type={isIncome ? "income" : "expense"}
        selectedCategory={transaction.category}
        setSelectedCategory={(category) =>
          setTransaction({ ...transaction, category })
        }
      />
    </>
  );
};

const AddTransactionForm = ({
  isIncome,
  submitHandler,
  amountInputRef,
  onAmountChanged,
  onDateChanged,
  cancel,
  wallet,
  isLoading,
}: {
  isIncome: boolean;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  amountInputRef: React.MutableRefObject<HTMLInputElement | null>;
  onAmountChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChanged: (date: DateValueType) => void;
  cancel: () => void;
  wallet: Wallet;
  isLoading: boolean;
}) => {
  const INITIAL_STATE: FinancialTransaction = {
    id: "0",
    type: "expense",
    amount: undefined,
    date: { startDate: null, endDate: null },
    periodicity: "One-time payment",
    walletId: wallet.id,
  };
  const transaction = useTransaction() || INITIAL_STATE;
  const setTransaction = useSetTransaction();
  const setOpenCategories = useSetOpenCategories();
  const isEditing = useIsEditing();

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
              setTransaction({
                ...transaction,
                category: undefined,
                type: isIncome ? "income" : "expense",
              })
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
              openCategories={() => setOpenCategories(true)}
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
                  setTransaction({ ...transaction, merchant: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <Notes
                notes={transaction.notes ?? ""}
                onNotesChanged={(e) =>
                  setTransaction({ ...transaction, notes: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <PeriodicityDropdown
                value={transaction.periodicity}
                onChange={(periodicity) =>
                  setTransaction({ ...transaction, periodicity })
                }
              />
            </div>
            <div className="mt-2">
              <ActionButtons
                isIncome={isIncome}
                isEditing={isEditing}
                onCancel={cancel}
                canCreate={(transaction?.amount as number) > 0 && !isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTransaction;
