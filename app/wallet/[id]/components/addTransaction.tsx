import React from "react";
import { classNames } from "@/app/utils";
import { FinancialTransaction } from "@/app/types";
import Switcher from "@/app/wallet/[id]/components/switcher";
import InputAmount from "@/app/wallet/[id]/components/inputAmount";
import DatePicker from "@/app/components/datePicker";
import Merchant from "@/app/wallet/[id]/components/merchant";
import Notes from "@/app/wallet/[id]/components/notes";
import PeriodicityDropdown from "@/app/wallet/[id]/components/periodicityDropdown";
import ActionButtons from "@/app/wallet/[id]/components/actionButtons";
import CategoriesDialog from "@/app/components/categoriesDialog";

const INITIAL_STATE: FinancialTransaction = {
  id: 0,
  type: "expense",
  amount: undefined,
  date: { startDate: new Date(), endDate: null },
  periodicity: "One-time payment",
};
const AddTransaction = ({ expense }: { expense?: FinancialTransaction }) => {
  // If we get an expense, and it is income type or if we have no expense the default type is income
  const [transaction, setTransaction] = React.useState<FinancialTransaction>(INITIAL_STATE);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState<boolean>(false);
  const isIncome = transaction?.type === "income" ?? "expense";
  const amountInputRef = React.useRef();
  React.useEffect(() => {
    if (!expense) {
      setTransaction(INITIAL_STATE);
    } else {
      setTransaction(expense);
    }
  }, [expense]);
 function onAmountChanged(e: React.ChangeEvent<HTMLInputElement>) {
   if(!amountInputRef.current) return;
   const amountInputElement = amountInputRef.current as HTMLInputElement;
   setTransaction((t) => ({...t, amount: amountInputElement.value}))
 }
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted");
    console.log({transaction});
    setTransaction(INITIAL_STATE);
  }
  return (
      <>
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
              value={transaction.amount?.toString() ?? ""}
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
                onDateChanged={(date) => setTransaction((t) => ({...t, date}))}
              />
            </div>
            <div className="mt-2">
              <Merchant
                merchant={transaction.merchant ?? ""}
                onMerchantChanged={(e) => setTransaction((t) => ({...t, merchant: e.target.value}))}
              />
            </div>
            <div className="mt-2">
              <Notes
                notes={transaction.notes ?? ""}
                onNotesChanged={(e) => setTransaction((t) => ({...t, notes: e.target.value}))}
              />
            </div>
            <div className="mt-2">
              <PeriodicityDropdown
                value={transaction.periodicity}
                onChange={(periodicity) => setTransaction((t) => ({...t, periodicity}))}
              />
            </div>
            <div className="mt-2">
              <ActionButtons
                isIncome={isIncome}
                isEditing={!!expense}
                onCancel={() => setTransaction(INITIAL_STATE)}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
      <CategoriesDialog
        isOpen={isCategoriesOpen}
        close={() => setIsCategoriesOpen(false)}
        type={isIncome ? "income" : "expense"}
        selectedCategory={transaction.category}
        setSelectedCategory={(category) => setTransaction((t) => ({...t, category}))}
      />
      </>

  );
};

export default AddTransaction;
