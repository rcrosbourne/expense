"use client";
import React from "react";
import { classNames } from "@/app/utils";
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

dayjs.extend(timezone);
dayjs.extend(utc);

const Wallet = () => {
  const [isIncome, setIsIncome] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState({
    startDate: new Date(),
    endDate: null,
  });
  const [selected, setSelected] = React.useState(recurringPeriodicity[0]);
  let [isCategoriesOpen, setIsCategoriesOpen] = React.useState<boolean>(false);
  const ref = React.useRef();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Remove the separator and convert to number
    let inputElement = e.currentTarget as HTMLInputElement;
    let value = inputElement.value.replace(",", "");
    if (value !== amount) {
      setAmount(value);
      console.log(value);
    }
  }

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
  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Wallet</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <WalletOverview />
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
                <form action="">
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <InputAmount
                      ref={ref}
                      onChange={onChange}
                      isIncome={isIncome}
                     openCategories={openCategories}/>
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
                      <Merchant />
                    </div>
                    <div className="mt-2">
                      <Notes />
                    </div>
                    <div className="mt-2">
                      <PeriodicityDropdown
                        value={selected}
                        onChange={setSelected}
                      />
                    </div>
                    <div className="mt-2">
                      <ActionButtons isIncome={isIncome} />
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
      />
    </main>
  );
};
export default Wallet;
