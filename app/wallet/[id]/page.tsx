"use client";
import React from "react";
import {classNames, formatNumberAsCurrency} from "@/app/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CategoriesDialog from "@/app/components/categoriesDialog";
import { recurringPeriodicity } from "@/app/data/recurringPeriodicity";
import DatePicker from "@/app/components/datePicker";
import WalletOverview from "@/app/wallet/[id]/components/walletOverview";
import PeriodicityDropdown from "@/app/wallet/[id]/components/periodicityDropdown";
import ActionButtons from "@/app/wallet/[id]/components/actionButtons";
import Notes from "@/app/wallet/[id]/components/notes";
import Merchant from "@/app/wallet/[id]/components/merchant";
import Switcher from "@/app/wallet/[id]/components/Switcher";
import InputAmount from "@/app/wallet/[id]/components/InputAmount";
import { transactions } from "@/app/data/transactions";
import { FinancialTransaction } from "@/app/types/financialTransaction";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Category } from "@/app/types/category";
import ConfirmDialog from "@/app/components/confirmDialog";
import TransactionList from "@/app/wallet/[id]/components/transactionList";

dayjs.extend(timezone);
dayjs.extend(utc);

const Wallet = () => {
  const [isIncome, setIsIncome] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });
  const [periodicity, setPeriodicity] = React.useState(recurringPeriodicity[0]);
  const [isCategoriesOpen, setIsCategoriesOpen] =
    React.useState<boolean>(false);
  const [isEditingExpense, setIsEditingExpense] =
    React.useState<boolean>(false);
  const [editExpense, setEditExpense] =
    React.useState<FinancialTransaction | null>(null);
  const [merchant, setMerchant] = React.useState<string | undefined>("");
  const [notes, setNotes] = React.useState<string | undefined>("");
  const [category, setCategory] = React.useState<Category | undefined>(
    undefined
  );
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [expenseToBeDeleted, setExpenseToBeDeleted] = React.useState<
    FinancialTransaction | undefined
  >(undefined);
  const inputRef = React.useRef();
  const expenseRef = React.useRef(null);

  React.useEffect(() => {
    if (isEditingExpense) {
      if (!inputRef.current) return;
      if (!editExpense) return;
      let inputElement = inputRef.current as HTMLInputElement;
      inputElement.value = formatNumberAsCurrency(editExpense.amount);
      inputElement.focus();
    } else {
      // Change focus from the input to the expense list item
      if (!expenseRef.current) return;
      let liElement = expenseRef.current as HTMLLIElement;
      liElement.focus();
    }
  }, [isEditingExpense, editExpense]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove the separator and convert to number
    let inputElement = e.currentTarget as HTMLInputElement;
    let value = inputElement.value.replace(",", "");
    if (value !== amount) {
      setAmount(value);
    }
    console.log({ value, amount });
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ merchant, amount, notes, periodicity, dueDate, isIncome });
  };

  // @ts-ignore
  const handleDateChanged = (newDueDate) => {
    setDueDate(newDueDate);
  };
  const openCategories = () => {
    setIsCategoriesOpen(true);
  };
  const closeCategories = () => {
    setIsCategoriesOpen(false);
  };
  const handleEdit = (expense: FinancialTransaction) => {
    // show the edit form
    if (!inputRef.current) return;
    setEditExpense(expense);
    setIsEditingExpense(true);
    setIsIncome(expense.type === "income");
    // set all the fields
    setMerchant(expense?.merchant);
    setAmount(formatNumberAsCurrency(expense.amount));
    setDueDate(() => {
      if (!expense.date) {
        return { startDate: dayjs().format("YYYY-MM-DD"), endDate: null };
      }
      return { startDate: expense.date, endDate: expense.date };
    });
    setNotes(expense.notes ?? "");
    setPeriodicity(expense.periodicity);
    setCategory(expense.category);
  };
  const handleCancel = (expense: FinancialTransaction) => {
    // show the edit form
    if (!inputRef.current) return;
    setEditExpense(null);
    setIsEditingExpense(false);
    //clear all the fields
    setMerchant("");
    setAmount("");
    setDueDate({ startDate: null, endDate: null });
    setNotes("");
    setPeriodicity(recurringPeriodicity[0]);
    setCategory(undefined);
  };

  const cancelHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!editExpense) {
      // clear all the fields
      setMerchant("");
      setAmount("");
      setDueDate({ startDate: null, endDate: null });
      setNotes("");
      setPeriodicity(recurringPeriodicity[0]);
      setCategory(undefined);
      return;
    }
    handleCancel(editExpense);
  };
  const handleDelete = (expense: FinancialTransaction) => {
    // show confirm dialog
    setExpenseToBeDeleted(expense);
    setOpenConfirmDelete(true);
  };
  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Wallet</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <WalletOverview />
            <section aria-labelledby="quick-links-title">
              <div className="sm:grid-cols-1 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                <h2 className="sr-only" id="quick-links-title">
                  Quick links
                </h2>
                <TransactionList
                  transactions={transactions}
                  editingTransaction={editExpense}
                  transactionRef={expenseRef}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                />
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Add Income and Expenses */}
            <section aria-labelledby="" className="@container/section">
              <div
                className={classNames(
                  isIncome ? "bg-teal-700" : "bg-red-400",
                  " rounded-t-lg  shadow transition-colors duration-1000 ease-in-out h-[150px]"
                )}
              >
                <div className="mx-auto p-4 flex justify-center relative">
                  <Switcher isIncome={isIncome} setIsIncome={setIsIncome} />
                </div>
              </div>
              <div className="bg-slate-50 min-h-52 rounded-b-lg shadow-lg relative">
                <form onSubmit={submitHandler}>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <InputAmount
                      inputRef={inputRef}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      isIncome={isIncome}
                      openCategories={openCategories}
                      category={category}
                    />
                  </div>
                  <div className="p-4 space-y-8">
                    <div className="mt-2">
                      <DatePicker
                        useRange={false}
                        asSingle={true}
                        value={dueDate}
                        onDateChanged={handleDateChanged}
                      />
                    </div>
                    <div className="mt-2">
                      <Merchant
                        merchant={merchant ?? ""}
                        onMerchantChanged={(e) => setMerchant(e.target.value)}
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
                        isEditing={isEditingExpense}
                        onCancel={cancelHandler}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>{" "}
        </div>
      </div>
      <CategoriesDialog
        isOpen={isCategoriesOpen}
        close={closeCategories}
        type={isIncome ? "income" : "expense"}
        selectedCategory={category}
        setSelectedCategory={(category) => setCategory(category)}
      />
      <ConfirmDialog
        openConfirm={openConfirmDelete}
        setOpenConfirm={setOpenConfirmDelete}
        title={"Delete expense/income"}
        message={`Are you sure you want to delete expense ${expenseToBeDeleted?.category?.name} with amount $${formatNumberAsCurrency(expenseToBeDeleted?.amount)} 
          This action cannot be undone.`}
        confirmButtonText={"Delete"}
        cancelButtonText={"Cancel"}
        confirm={(status) => {
          if (status) {
            console.log({ expenseToBeDeleted });
            setOpenConfirmDelete(false);
          } else {
            setExpenseToBeDeleted(undefined);
            setOpenConfirmDelete(false);
          }
        }}
      />
    </main>
  );
};
export default Wallet;
