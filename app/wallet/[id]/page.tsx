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
import { incomeAndExpenses } from "@/app/data/incomeAndExpenses";

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
  const inputRef = React.useRef();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Remove the separator and convert to number
    let inputElement = e.currentTarget as HTMLInputElement;
    let value = inputElement.value.replace(",", "");
    if (value !== amount) {
      setAmount(value);
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
            <section aria-labelledby="quick-links-title">
              <div className="sm:grid-cols-1 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                <h2 className="sr-only" id="quick-links-title">
                  Quick links
                </h2>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  {incomeAndExpenses.map((expense) => {
                    return (
                      <li
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                        key={expense.id}
                      >
                        <div className="flex w-full items-center justify-between space-x-6 pr-6 py-6 relative">
                          <div className="absolute text-slate-950 top-0 left-0 flex items-center justify-center mt-2 ml-2">
                            {expense.isRecurring && (
                              <>
                                <span className="sr-only">Recurring</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="h-6 w-6 fill-current"
                                >
                                  <linearGradient
                                    id="a"
                                    x1="12"
                                    x2="12"
                                    y1="3"
                                    y2="21"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop offset="1" />
                                    <stop offset="1" stopColor="#040404" />
                                  </linearGradient>
                                  <path
                                    fillRule="evenodd"
                                    d="M6.754 4.686A9 9 0 1 1 3 12a1 1 0 1 1 2 0 7 7 0 1 0 3.386-5.996h.368a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0zM12 7a1 1 0 0 1 1 1v3.586l2.207 2.207a1 1 0 0 1-1.414 1.414l-2.5-2.5A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1z"
                                    clipRule="evenodd"
                                    data-original="url(#a)"
                                  />
                                </svg>
                              </>
                            )}
                          </div>
                          <div className="flex-1  mt-3">
                            <div className="flex items-center space-x-3">
                              <h3 className="truncate text-lg font-medium text-gray-900">
                                ${Intl.NumberFormat().format(expense.amount)}
                              </h3>
                              <span
                                className={`inline-block truncate flex-shrink-0 rounded-full ${expense.category.backgroundColor} px-2 py-0.5 text-xs font-medium text-slate-900`}
                              >
                                {expense.category.name}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">
                              {expense.date}
                            </p>
                            <p className="mt-1 truncate text-sm text-gray-500">
                              {expense.merchant}
                            </p>
                          </div>
                          <div
                            className={`h-20 w-20 flex-shrink-0 rounded-full ${expense.category.backgroundColor} p-3`}
                          >
                            {expense.category.icon}
                          </div>
                        </div>
                        <div>
                          <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                              <a
                                href=""
                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="h-5 w-5 text-gray-400"
                                >
                                  <path
                                    fill="#607d8b"
                                    d="M17 24H3c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h8a1 1 0 1 1 0 2H3c-.552 0-1 .449-1 1v14c0 .551.448 1 1 1h14c.552 0 1-.449 1-1v-8a1 1 0 1 1 2 0v8c0 1.654-1.346 3-3 3z"
                                  />
                                  <path
                                    fill="#42a5f5"
                                    d="m17.288 3.177-7.912 7.912a.506.506 0 0 0-.137.255l-.707 3.536a.498.498 0 0 0 .491.598l.098-.01 3.535-.707a.494.494 0 0 0 .256-.137l7.912-7.912zM23.268.732a2.502 2.502 0 0 0-3.535 0l-1.384 1.384 3.535 3.535 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z"
                                  />
                                  <path
                                    fill="#546d79"
                                    d="M19 12a1 1 0 0 0-1 1v8c0 .551-.448 1-1 1H3a.997.997 0 0 1-.707-.293L.88 23.12c.543.544 1.293.88 2.12.88h14c1.654 0 3-1.346 3-3v-8a1 1 0 0 0-1-1z"
                                  />
                                  <g fill="#3990d5">
                                    <path d="M19.056 4.944 8.669 15.331a.5.5 0 0 0 .354.146l.098-.01 3.535-.707a.494.494 0 0 0 .256-.137l7.912-7.912zM23.268.732l-3.151 3.151 1.768 1.768 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z" />
                                  </g>
                                </svg>
                                Edit
                              </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                              <a
                                href="tel:+1-202-555-0170"
                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-name="Layer 1"
                                  viewBox="0 0 512 512"
                                  className="h-5 w-5 text-gray-400"
                                >
                                  <path
                                    fill="#fc0005"
                                    fillRule="evenodd"
                                    d="M170.8 14.221A14.21 14.21 0 0 1 185 .014L326.991.006a14.233 14.233 0 0 1 14.2 14.223v35.117H170.8zm233.461 477.443a21.75 21.75 0 0 1-21.856 20.33H127.954a21.968 21.968 0 0 1-21.854-20.416L84.326 173.06H427.5l-23.234 318.6zm56.568-347.452H51.171v-33A33.035 33.035 0 0 1 84.176 78.2l343.644-.011a33.051 33.051 0 0 1 33 33.02v33zm-270.79 291.851a14.422 14.422 0 1 0 28.844 0V233.816a14.42 14.42 0 0 0-28.839-.01v202.257zm102.9 0a14.424 14.424 0 1 0 28.848 0V233.816a14.422 14.422 0 0 0-28.843-.01z"
                                  />
                                </svg>
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
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
                <form action="">
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <InputAmount
                      inputRef={inputRef}
                      onChange={onChange}
                      isIncome={isIncome}
                      openCategories={openCategories}
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
