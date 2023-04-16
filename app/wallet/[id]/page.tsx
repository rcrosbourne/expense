"use client";
import React from "react";
import { classNames, formatNumberAsCurrency } from "@/app/utils";
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
import Switcher from "@/app/wallet/[id]/components/switcher";
import InputAmount from "@/app/wallet/[id]/components/inputAmount";
import { transactions } from "@/app/data/transactions";
import { FinancialTransaction } from "@/app/types/financialTransaction";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import {AnyCategory, Category} from "@/app/types/category";
import ConfirmDialog from "@/app/components/confirmDialog";
import TransactionList from "@/app/wallet/[id]/components/transactionList";
import { Tab } from "@headlessui/react";
import BudgetCalendar from "@/app/wallet/[id]/components/budgetCalendar";
import {
  BarChartIcon,
  CalendarIcon,
  CheckListIcon,
} from "@/app/components/icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TransactionBreakdown from "@/app/wallet/[id]/components/transactionBreakdown";

dayjs.extend(timezone);
dayjs.extend(utc);
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const data = [50000, 250000];
const barOptions = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const barData = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 300, 400],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [200, 300, 400, 500],
      backgroundColor: "rgb(54, 162, 235)",
    },
  ],
};
const barExpenseData = {
  labels: ["Groceries", "Shopping", "Mortgage", "Rent", "Utilities"],
  datasets: [
    {
      label: "YTD Expense",
      data: [100, 200, 300, 400, 440, 50, 900],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

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

  React.useEffect(() => {}, []);
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
    if (!amountInputRef.current) return;
    // input ref should have focus
    let inputElement = amountInputRef.current as HTMLInputElement;
    inputElement.focus();
    setEditTransaction(expense);
    setIsEditingTransaction(true);
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
    if (!amountInputRef.current) return;
    setEditTransaction(null);
    setIsEditingTransaction(false);
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
    if (!editTransaction) {
      // clear all the fields
      setMerchant("");
      setAmount("");
      setDueDate({ startDate: null, endDate: null });
      setNotes("");
      setPeriodicity(recurringPeriodicity[0]);
      setCategory(undefined);
      return;
    }
    handleCancel(editTransaction);
  };
  const handleDelete = (expense: FinancialTransaction) => {
    // show confirm dialog
    setTransactionToBeDeleted(expense);
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
            {/*Tabs go here */}
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-slate-600/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center justify-center gap-3 w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-600 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-slate-100 shadow"
                        : "text-cyan-700 hover:bg-slate-50/[0.12] hover:text-slate-900"
                    )
                  }
                >
                  <span>
                    <CheckListIcon className="h-6 sm:h-8 aspect-square" />
                  </span>
                  <span className="hidden sm:inline-block">Details</span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center justify-center gap-3 w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-600 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-slate-100 shadow"
                        : "text-cyan-700 hover:bg-slate-50/[0.12] hover:text-slate-900"
                    )
                  }
                >
                  <span>
                    <CalendarIcon className="h-6 sm:h-8 aspect-square" />
                  </span>
                  <span className="hidden sm:inline-block">Calendar</span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "flex items-center justify-center gap-3 w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-cyan-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-600 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-slate-100 shadow"
                        : "text-cyan-700 hover:bg-slate-50/[0.12] hover:text-slate-900"
                    )
                  }
                >
                  <span>
                    <BarChartIcon className="h-6 sm:h-8 aspect-square" />
                  </span>
                  <span className="hidden sm:inline-block">Reports</span>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-slate-100",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-600 focus:outline-none focus:ring-2"
                  )}
                >
                  <section aria-labelledby="quick-links-title">
                    <div className="sm:grid-cols-1 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                      <h2 className="sr-only" id="quick-links-title">
                        Transactions
                      </h2>
                      <TransactionList
                        transactions={transactions}
                        editingTransaction={editTransaction}
                        transactionRef={transactionRef}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                        onDelete={handleDelete}
                      />
                    </div>
                  </section>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-slate-100 overflow-hidden",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-600 focus:outline-none focus:ring-2"
                  )}
                >
                  <section aria-labelledby="quick-links-title">
                    <div className="sm:grid-cols-1 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                      <h2 className="sr-only" id="quick-links-title">
                        Calendar
                      </h2>
                      <BudgetCalendar transactions={transactions} />
                    </div>
                  </section>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-slate-100 overflow-hidden",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-600 focus:outline-none focus:ring-2"
                  )}
                >
                  <section aria-labelledby="quick-links-title">
                    <div className="sm:grid-cols-1 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                      <h2 className="sr-only" id="quick-links-title">
                        Reports
                      </h2>
                      <div className="flex w-full items-center justify-between">
                        <div className="bg-slate-50 rounded shadow h-full w-full p-4">
                          <Tab.Group>
                            <div className="flex items-center justify-between w-full border-b border-slate-200">
                              <h3 className="hidden md:inline-block">Performance</h3>
                              <Tab.List className="space-x-8">
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            "border-b-2 py-4 px-1 text-center text-sm font-medium",
                                            selected
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        )
                                    }
                                >
                                  <span className="hidden sm:inline-block">Income</span>
                                  <span className="sm:hidden">Income</span>
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            "border-b-2 py-4 px-1 text-center text-sm font-medium truncate",
                                            selected
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        )
                                    }
                                >
                                  <span className="hidden sm:inline-block">Expense</span>
                                  <span className="sm:hidden">Expense</span>

                                </Tab>
                                <Tab
                                  className={({ selected }) =>
                                    classNames(
                                      "border-b-2 py-4 px-1 text-center text-sm font-medium",
                                      selected
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    )
                                  }
                                >
                                  Expense Breakdown
                                </Tab>

                              </Tab.List>
                            </div>
                            <Tab.Panels className="mt-4">
                              <Tab.Panel>
                                <TransactionBreakdown transactions={transactions.filter(t => t.type === 'income')} />
                              </Tab.Panel>
                              <Tab.Panel>
                                  <TransactionBreakdown transactions={transactions.filter((t => t.type === 'expense'))} />
                              </Tab.Panel>
                              <Tab.Panel>
                                <div className="flex items-center justify-center">
                                  <Bar data={barExpenseData} options={barOptions} />
                                </div>
                              </Tab.Panel>
                            </Tab.Panels>
                          </Tab.Group>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
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
                      inputRef={amountInputRef}
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
                        isEditing={isEditingTransaction}
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
        message={`Are you sure you want to delete expense ${
          transactionToBeDeleted?.category?.name
        } with amount $${formatNumberAsCurrency(
          transactionToBeDeleted?.amount
        )} 
          This action cannot be undone.`}
        confirmButtonText={"Delete"}
        cancelButtonText={"Cancel"}
        confirm={(status) => {
          if (status) {
            console.log({ expenseToBeDeleted: transactionToBeDeleted });
            setOpenConfirmDelete(false);
          } else {
            setTransactionToBeDeleted(undefined);
            setOpenConfirmDelete(false);
          }
        }}
      />
    </main>
  );
};
export default Wallet;
