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
import Switcher from "@/app/wallet/[id]/components/Switcher";
import InputAmount from "@/app/wallet/[id]/components/inputAmount";
import { transactions } from "@/app/data/transactions";
import { FinancialTransaction } from "@/app/types/financialTransaction";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Category } from "@/app/types/category";
import ConfirmDialog from "@/app/components/confirmDialog";
import TransactionList from "@/app/wallet/[id]/components/transactionList";
import { Tab } from "@headlessui/react";
import BudgetCalendar from "@/app/wallet/[id]/components/budgetCalendar";

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
  const [isEditingTransaction, setIsEditingTransaction] =
    React.useState<boolean>(false);
  const [editTransaction, setEditTransaction] =
    React.useState<FinancialTransaction | null>(null);
  const [merchant, setMerchant] = React.useState<string | undefined>("");
  const [notes, setNotes] = React.useState<string | undefined>("");
  const [category, setCategory] = React.useState<Category | undefined>(
    undefined
  );
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [transactionToBeDeleted, setTransactionToBeDeleted] = React.useState<
    FinancialTransaction | undefined
  >(undefined);
  const amountInputRef = React.useRef();
  const transactionRef = React.useRef(null);

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 438.907 438.907"
                      className="fill-current h-6 w-6"
                    >
                      <path
                        fill="#d4e1f4"
                        d="M379.323 99.837V399.2c0 17.312-14.035 31.347-31.347 31.347H90.931c-17.312 0-31.347-14.035-31.347-31.347V99.837c0-17.312 14.034-31.347 31.347-31.347h51.2v36.571h154.122V68.49h51.722c17.313 0 31.348 14.035 31.348 31.347z"
                      />
                      <path
                        fill="#00ceb4"
                        d="M296.253 68.49v36.571H142.131V39.756h38.139c3.926-18.232 20.012-31.274 38.661-31.347 18.721-.129 34.917 13.004 38.661 31.347h38.661V68.49z"
                      />
                      <g fill="#083863">
                        <path d="M347.976 57.519H308.27V39.756c0-5.747-6.269-8.359-12.016-8.359H265.43C258.539 11.838 239.648-.898 218.932.05c-20.668-.777-39.467 11.896-46.498 31.347h-30.302c-5.747 0-11.494 2.612-11.494 8.359v17.763H90.931c-23.53.251-42.78 18.813-43.886 42.318V399.2c0 22.988 20.898 39.706 43.886 39.706h257.045c22.988 0 43.886-16.718 43.886-39.706V99.837c-1.107-23.505-20.356-42.067-43.886-42.318zm-196.441-5.225h28.735a10.971 10.971 0 0 0 9.927-9.404c3.094-13.474 14.915-23.146 28.735-23.51 13.692.415 25.335 10.118 28.212 23.51a11.494 11.494 0 0 0 10.449 9.404h29.78V94.09H151.535V52.294zm219.429 346.907c0 11.494-11.494 18.808-22.988 18.808H90.931c-11.494 0-22.988-7.314-22.988-18.808V99.837c1.066-11.964 10.978-21.201 22.988-21.42h39.706v26.645c.552 5.854 5.622 10.233 11.494 9.927h154.122a11.493 11.493 0 0 0 12.016-9.927V78.417h39.706c12.009.22 21.922 9.456 22.988 21.42v299.364z" />
                        <path d="M131.159 290.009a9.403 9.403 0 0 1-7.314-3.135l-21.42-21.943a10.971 10.971 0 0 1 0-15.151c4.204-3.841 10.709-3.609 14.629.522l14.106 14.629 33.437-31.869c4.204-3.841 10.709-3.609 14.629.522 4.04 3.706 4.31 9.986.603 14.025a9.8 9.8 0 0 1-.603.603l-40.751 38.661a10.452 10.452 0 0 1-7.316 3.136zM329.168 276.947H209.004c-5.771 0-10.449-4.678-10.449-10.449s4.678-10.449 10.449-10.449h120.163c5.771 0 10.449 4.678 10.449 10.449.001 5.771-4.678 10.449-10.448 10.449zM131.159 206.417a9.403 9.403 0 0 1-7.314-3.135l-21.42-21.943a10.971 10.971 0 0 1 0-15.151c4.204-3.841 10.709-3.609 14.629.522l14.106 14.629 33.437-31.869c4.204-3.841 10.709-3.609 14.629.522 4.04 3.706 4.31 9.986.603 14.025a9.8 9.8 0 0 1-.603.603l-40.751 38.661a10.448 10.448 0 0 1-7.316 3.136zM329.168 193.356H209.004c-5.771 0-10.449-4.678-10.449-10.449s4.678-10.449 10.449-10.449h120.163c5.771 0 10.449 4.678 10.449 10.449.001 5.77-4.678 10.449-10.448 10.449zM131.159 373.601a9.403 9.403 0 0 1-7.314-3.135l-21.42-21.943a10.971 10.971 0 0 1 0-15.151c4.204-3.841 10.709-3.609 14.629.522l14.106 14.629 33.437-31.869c4.204-3.841 10.709-3.609 14.629.522 4.04 3.706 4.31 9.986.603 14.025a9.8 9.8 0 0 1-.603.603l-40.751 38.661a10.452 10.452 0 0 1-7.316 3.136zM329.168 360.539H209.004c-5.771 0-10.449-4.678-10.449-10.449s4.678-10.449 10.449-10.449h120.163c5.771 0 10.449 4.678 10.449 10.449.001 5.771-4.678 10.449-10.448 10.449z" />
                      </g>
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 682.667 682.667"
                      className="w-6 h-6"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" />
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                      >
                        <path
                          fill="#d3dcfb"
                          d="M246.509 90.334H57.184c-18.3 0-33.133 14.833-33.133 33.131V156.6h254.282Z"
                        />
                        <path
                          fill="#ebf5fc"
                          d="M454.816 355.4V123.467H57.183c-18.299 0-33.133 14.834-33.133 33.133v198.8L256 438.234z"
                        />
                        <path
                          fill="#3c58a0"
                          d="M82.328 289.133H65.194a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.134a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M148.595 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M214.861 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M281.128 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M347.384 289.133H330.25a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M413.65 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M82.328 222.867H65.194a8 8 0 0 0-8 8V248a8 8 0 0 0 8 8h17.134a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M148.595 222.867h-17.133a8 8 0 0 0-8 8V248a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M214.861 222.867h-17.133a8 8 0 0 0-8 8V248a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8M289.128 222.867v24.85a8.282 8.282 0 0 1-8.283 8.283h-16.567a8.282 8.282 0 0 1-8.283-8.283V231.15a8.282 8.282 0 0 1 8.283-8.283ZM82.328 156.6H65.194a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.134a8 8 0 0 0 8-8V164.6a8 8 0 0 0-8-8M148.595 156.6h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8V164.6a8 8 0 0 0-8-8M214.861 156.6h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8V164.6a8 8 0 0 0-8-8"
                        />
                        <path
                          fill="#2a428c"
                          d="M413.65 322.267h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M347.384 322.267H330.25a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M281.128 322.267h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M214.861 322.267h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M148.595 322.267h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M82.328 322.267H65.195a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M82.328 256H65.195a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8V248a8 8 0 0 1-8 8M82.328 189.733H65.195a7.982 7.982 0 0 1-2.933-.562c2.964-1.17 5.066-4.057 5.066-7.438V164.6c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M148.595 256h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8V248a8 8 0 0 1-8 8M148.595 189.733h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.17 5.066-4.057 5.066-7.438V164.6c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8M214.861 256h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8V248a8 8 0 0 1-8 8M289.128 222.867V248a8 8 0 0 1-8 8h-17.133a7.961 7.961 0 0 1-2.933-.562c2.964-1.171 5.066-4.056 5.066-7.438v-17.133c0-3.382-2.102-6.267-5.066-7.438a7.982 7.982 0 0 1 2.933-.562ZM214.861 189.733h-17.133a7.982 7.982 0 0 1-2.933-.562c2.964-1.17 5.066-4.057 5.066-7.438V164.6c0-3.382-2.102-6.267-5.066-7.438a7.961 7.961 0 0 1 2.933-.562h17.133a8 8 0 0 1 8 8v17.133a8 8 0 0 1-8 8"
                        />
                        <path
                          fill="#d3dcfb"
                          d="M431.8 364.99V123.466h23.017V355.4z"
                        />
                        <path
                          fill="#ff4155"
                          d="M454.816 355.4v82.834c0 18.299-14.834 33.133-33.132 33.133h-364.5c-18.3 0-33.134-14.834-33.134-33.133V355.4z"
                        />
                        <path
                          fill="#ebf5fc"
                          d="M164.867 442.375c0-11.437-9.27-20.708-20.708-20.708-11.438 0-20.709 9.271-20.709 20.708v41.417c0 11.437 9.271 20.708 20.71 20.708 11.436 0 20.707-9.271 20.707-20.708ZM355.394 442.375c0-11.437-9.27-20.708-20.708-20.708-11.436 0-20.707 9.271-20.707 20.708v41.417c0 11.437 9.27 20.708 20.708 20.708 11.436 0 20.707-9.271 20.707-20.708Z"
                        />
                        <path
                          fill="#d3dcfb"
                          d="M334.687 504.5a20.604 20.604 0 0 1-11.488-3.482c5.556-3.714 9.218-10.041 9.218-17.226v-41.417c0-7.186-3.662-13.513-9.218-17.226a20.604 20.604 0 0 1 11.488-3.482c11.437 0 20.708 9.271 20.708 20.708v41.417c0 11.437-9.271 20.708-20.708 20.708M144.16 504.5a20.607 20.607 0 0 1-11.49-3.482c5.557-3.714 9.22-10.041 9.22-17.226v-41.417c0-7.186-3.663-13.513-9.22-17.226a20.607 20.607 0 0 1 11.49-3.482c11.436 0 20.707 9.271 20.707 20.708v41.417c0 11.437-9.27 20.708-20.708 20.708"
                        />
                        <path
                          fill="#e80054"
                          d="M421.685 471.367h-23.01c18.3 0 33.134-14.833 33.134-33.132V355.4h23.008v82.835c0 18.299-14.834 33.132-33.132 33.132"
                        />
                        <path
                          fill="#4fabf7"
                          d="M239.434 131.75c0 68.622 55.629 124.25 124.25 124.25 68.62 0 124.25-55.628 124.25-124.25S432.304 7.5 363.684 7.5c-68.621 0-124.25 55.628-124.25 124.25"
                        />
                        <path
                          fill="#ebf5fc"
                          d="M272.567 131.75c0 50.322 40.794 91.117 91.116 91.117S454.8 182.072 454.8 131.75s-40.795-91.117-91.117-91.117-91.116 40.795-91.116 91.117"
                        />
                        <path
                          fill="#1886ea"
                          d="M363.684 256c-3.878 0-7.712-.187-11.5-.535 63.229-5.804 112.75-58.972 112.75-123.715S415.413 13.839 352.184 8.035a125.64 125.64 0 0 1 11.5-.535c68.62 0 124.25 55.629 124.25 124.25 0 68.621-55.63 124.25-124.25 124.25"
                        />
                        <path
                          fill="#d3dcfb"
                          d="M363.684 222.867c-3.893 0-7.728-.246-11.492-.72 44.897-5.65 79.625-43.967 79.625-90.397 0-46.43-34.728-84.747-79.625-90.397a91.942 91.942 0 0 1 11.492-.72c50.322 0 91.117 40.795 91.117 91.117 0 50.323-40.795 91.117-91.117 91.117"
                        />
                        <path
                          fill="#ffdd40"
                          d="M380.25 131.75c0-9.149-7.417-16.567-16.566-16.567-9.15 0-16.567 7.418-16.567 16.567 0 9.149 7.417 16.567 16.567 16.567 9.149 0 16.566-7.418 16.566-16.567"
                        />
                        <path
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="15"
                          d="M454.816 216.203v222.032c0 18.298-14.834 33.132-33.133 33.132h-66.266M24.05 290.7V156.6c0-18.298 14.835-33.132 33.134-33.132h182.595M123.45 471.367H57.183c-18.298 0-33.132-14.834-33.132-33.132V320.7M313.978 471.367h-149.11"
                        />
                        <path
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="15"
                          d="M75.328 90.334H57.183c-18.298 0-33.132 14.834-33.132 33.131V156.6M246.509 90.334H105.328M164.867 442.375c0-11.437-9.27-20.708-20.708-20.708-11.438 0-20.709 9.271-20.709 20.708v41.417c0 11.437 9.271 20.708 20.71 20.708 11.436 0 20.707-9.271 20.707-20.708ZM123.45 438.233h-16.566M164.867 438.233h16.566M24.05 355.4h430.767M24.05 388.533h430.767M355.394 442.375c0-11.437-9.27-20.708-20.708-20.708-11.436 0-20.707 9.271-20.707 20.708v41.417c0 11.437 9.27 20.708 20.708 20.708 11.436 0 20.707-9.271 20.707-20.708ZM313.978 438.233h-16.567M355.394 438.233h16.567M82.328 289.133H65.194a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.134a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM148.595 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM214.861 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM281.128 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM347.384 289.133H330.25a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM413.65 289.133h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM82.328 222.867H65.194a8 8 0 0 0-8 8V248a8 8 0 0 0 8 8h17.134a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM148.595 222.867h-17.133a8 8 0 0 0-8 8V248a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM214.861 222.867h-17.133a8 8 0 0 0-8 8V248a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8v-17.133a8 8 0 0 0-8-8ZM279.209 222.867h-14.931a8.282 8.282 0 0 0-8.283 8.283v16.567a8.282 8.282 0 0 0 8.283 8.283h16.567a8.282 8.282 0 0 0 8.283-8.283V231.15M82.328 156.6H65.194a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.134a8 8 0 0 0 8-8V164.6a8 8 0 0 0-8-8ZM148.595 156.6h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8V164.6a8 8 0 0 0-8-8ZM214.861 156.6h-17.133a8 8 0 0 0-8 8v17.133a8 8 0 0 0 8 8h17.133a8 8 0 0 0 8-8V164.6a8 8 0 0 0-8-8Z"
                        />
                        <path
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="15"
                          d="M239.434 131.75c0 68.622 55.629 124.25 124.25 124.25 68.62 0 124.25-55.628 124.25-124.25S432.304 7.5 363.684 7.5c-68.621 0-124.25 55.628-124.25 124.25Z"
                        />
                        <path
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="15"
                          d="M272.567 131.75c0 50.322 40.794 91.117 91.116 91.117S454.8 182.072 454.8 131.75s-40.795-91.117-91.117-91.117-91.116 40.795-91.116 91.117Z"
                        />
                        <path
                          fill="none"
                          stroke="#000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="15"
                          d="M380.25 131.75c0-9.149-7.417-16.567-16.566-16.567-9.15 0-16.567 7.418-16.567 16.567 0 9.149 7.417 16.567 16.567 16.567 9.149 0 16.566-7.418 16.566-16.567ZM363.684 148.317v41.417M380.25 131.75h24.851"
                        />
                      </g>
                    </svg>
                  </span>
                  <span>Calendar</span>
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
                          <BudgetCalendar />
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
