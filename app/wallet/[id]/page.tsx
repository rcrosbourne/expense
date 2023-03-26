"use client";
import { WalletStats } from "@/app/types";
import React, { Fragment } from "react";
import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import { classNames } from "@/app/utils";
import { NumericFormat } from "react-number-format";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/20/solid";

dayjs.extend(timezone);
dayjs.extend(utc);

const stat: WalletStats = {
  total: "$100,000.00",
  lastThirtyDays: "$300,000.00",
  lastSevenDays: "$75,000.00",
};
const periods = [
  { id: 1, name: "One-time payment" },
  { id: 2, name: "Every Day" },
  { id: 3, name: "Every Week" },
  { id: 4, name: "Every 2 Weeks" },
  { id: 5, name: "Every 4 weeks" },
  { id: 6, name: "Every month" },
  { id: 7, name: "Every 2 months" },
  { id: 8, name: "Every 3 months" },
  { id: 9, name: "Every 6 months" },
  { id: 10, name: "Every year" },
];
const Wallet = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState({
    startDate: new Date(),
    endDate: null,
  });
  const [selected, setSelected] = React.useState(periods[0]);
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
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Add Expense / Income
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                  <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
                    <span className="text-gray-400 text-xs">Total</span>
                    <span className="text-gray-900 text-xl">
                      {stat.total}
                    </span>{" "}
                  </div>
                  <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
                    <span className="text-gray-400 text-xs">Last 30 days</span>
                    <span className="text-gray-900 text-xl">
                      {stat.lastThirtyDays}
                    </span>{" "}
                  </div>
                  <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
                    <span className="text-gray-400 text-xs">Last 7 days</span>
                    <span className="text-gray-900 text-xl">
                      {stat.lastSevenDays}
                    </span>{" "}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Add Income and Expenses */}
            <section aria-labelledby="" className="@container/section">
              <div
                className={classNames(
                  enabled ? "bg-teal-700" : "bg-red-400",
                  " rounded-t-lg  shadow transition-colors duration-1000 ease-in-out h-[150px]"
                )}
              >
                <div className="mx-auto p-4 flex justify-center relative">
                  <Switch.Group>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className="relative inline-flex h-[40px] w-4/5 shrink-0 bg-white cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-full" : "translate-x-0",
                          "pointer-events-none inline-block h-[34px] w-1/2 transform rounded-full bg-gray-300 shadow-lg ring-0 transition duration-700 ease-in-out"
                        )}
                      />
                      <Switch.Label className="absolute inset-y-0 left-0 top-1.5 text-sm pl-8 @2xl/section:pl-24">
                        Expense
                      </Switch.Label>
                      <Switch.Label className="absolute inset-y-0 right-0 top-1.5 text-sm pr-4 pr-8 @2xl/section:pr-24">
                        Income
                      </Switch.Label>
                    </Switch>
                  </Switch.Group>
                </div>
              </div>
              <div className="bg-slate-50 min-h-52 rounded-b-lg shadow-lg relative">
                <form action="">
                  <div className="flex flex-col absolute -top-16 w-full">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                    >
                      Amount
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white sm:text-xl w-2">{`${
                            enabled ? " + " : " - "
                          }`}</span>
                          <span className="text-white text-xl">$</span>
                        </div>
                      </div>
                      <NumericFormat
                        displayType="input"
                        type="text"
                        name="amount"
                        id="amount"
                        className="peer block w-full border-0 pl-12 bg-transparent text-white placeholder-white placeholder:text-2xl py-1.5 text-gray-900 focus:ring-0 sm:text-2xl sm:leading-6"
                        placeholder="0.00"
                        thousandSeparator=","
                        allowNegative={false}
                        maxLength={18}
                        decimalScale={2}
                        fixedDecimalScale
                        onChange={onChange}
                        getInputRef={ref}
                        autoComplete="off"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-white"
                        aria-hidden="true"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-14">
                        <span
                          className="text-white sm:text-xl"
                          id="price-currency"
                        >
                          JMD
                        </span>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <button
                          type="button"
                          onClick={openCategories}
                          className="flex items-center justify-center rounded p-2 text-white hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
                        >
                          <div className="relative flex h-5 w-5 fill-current">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="absolute inline-flex h-full w-full animate-ping opacity-75"
                            >
                              <path d="M128 40a88 88 0 1 0 88 88 88.1 88.1 0 0 0-88-88Zm0 160a72 72 0 1 1 72-72 72.081 72.081 0 0 1-72 72Z" />
                              <path d="M144 112a8 8 0 0 0 0-16h-8a8 8 0 0 0-16 0h-8a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24v8h-24a8 8 0 0 0 0 16h8a8 8 0 0 0 16 0h8a8 8 0 0 0 8-8v-24a8 8 0 0 0-8-8h-24v-8Z" />
                              <path d="M220 8H36A28.032 28.032 0 0 0 8 36v184a28.032 28.032 0 0 0 28 28h184a28.032 28.032 0 0 0 28-28V36a28.032 28.032 0 0 0-28-28Zm12 212a12.013 12.013 0 0 1-12 12H36a12.013 12.013 0 0 1-12-12V36a12.013 12.013 0 0 1 12-12h184a12.013 12.013 0 0 1 12 12ZM476 8H292a28.032 28.032 0 0 0-28 28v184a28.032 28.032 0 0 0 28 28h184a28.032 28.032 0 0 0 28-28V36a28.032 28.032 0 0 0-28-28Zm12 212a12.013 12.013 0 0 1-12 12H292a12.013 12.013 0 0 1-12-12V36a12.013 12.013 0 0 1 12-12h184a12.013 12.013 0 0 1 12 12ZM220 264H36a28.032 28.032 0 0 0-28 28v184a28.032 28.032 0 0 0 28 28h184a28.032 28.032 0 0 0 28-28V292a28.032 28.032 0 0 0-28-28Zm12 212a12.013 12.013 0 0 1-12 12H36a12.013 12.013 0 0 1-12-12V292a12.013 12.013 0 0 1 12-12h184a12.013 12.013 0 0 1 12 12ZM476 264H292a28.031 28.031 0 0 0-28 28v184a28.031 28.031 0 0 0 28 28h184a28.031 28.031 0 0 0 28-28V292a28.031 28.031 0 0 0-28-28Zm12 212a12.01 12.01 0 0 1-12 12H292a12.01 12.01 0 0 1-12-12V292a12.01 12.01 0 0 1 12-12h184a12.01 12.01 0 0 1 12 12Z" />
                              <path d="M439.972 359.335A8 8 0 0 0 432 352h-16v-12a28.032 28.032 0 0 0-28-28h-8a28.032 28.032 0 0 0-28 28v12h-16a8 8 0 0 0-7.972 7.335l-8 96A8 8 0 0 0 328 464h112a8 8 0 0 0 7.972-8.665ZM368 340a12.013 12.013 0 0 1 12-12h8a12.013 12.013 0 0 1 12 12v12h-32Zm-31.306 108 6.667-80H352v8a8 8 0 0 0 16 0v-8h32v8a8 8 0 0 0 16 0v-8h8.639l6.667 80Z" />
                            </svg>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="relative inline-flex h-5 w-5"
                            >
                              <path d="M128 40a88 88 0 1 0 88 88 88.1 88.1 0 0 0-88-88Zm0 160a72 72 0 1 1 72-72 72.081 72.081 0 0 1-72 72Z" />
                              <path d="M144 112a8 8 0 0 0 0-16h-8a8 8 0 0 0-16 0h-8a8 8 0 0 0-8 8v24a8 8 0 0 0 8 8h24v8h-24a8 8 0 0 0 0 16h8a8 8 0 0 0 16 0h8a8 8 0 0 0 8-8v-24a8 8 0 0 0-8-8h-24v-8Z" />
                              <path d="M220 8H36A28.032 28.032 0 0 0 8 36v184a28.032 28.032 0 0 0 28 28h184a28.032 28.032 0 0 0 28-28V36a28.032 28.032 0 0 0-28-28Zm12 212a12.013 12.013 0 0 1-12 12H36a12.013 12.013 0 0 1-12-12V36a12.013 12.013 0 0 1 12-12h184a12.013 12.013 0 0 1 12 12ZM476 8H292a28.032 28.032 0 0 0-28 28v184a28.032 28.032 0 0 0 28 28h184a28.032 28.032 0 0 0 28-28V36a28.032 28.032 0 0 0-28-28Zm12 212a12.013 12.013 0 0 1-12 12H292a12.013 12.013 0 0 1-12-12V36a12.013 12.013 0 0 1 12-12h184a12.013 12.013 0 0 1 12 12ZM220 264H36a28.032 28.032 0 0 0-28 28v184a28.032 28.032 0 0 0 28 28h184a28.032 28.032 0 0 0 28-28V292a28.032 28.032 0 0 0-28-28Zm12 212a12.013 12.013 0 0 1-12 12H36a12.013 12.013 0 0 1-12-12V292a12.013 12.013 0 0 1 12-12h184a12.013 12.013 0 0 1 12 12ZM476 264H292a28.031 28.031 0 0 0-28 28v184a28.031 28.031 0 0 0 28 28h184a28.031 28.031 0 0 0 28-28V292a28.031 28.031 0 0 0-28-28Zm12 212a12.01 12.01 0 0 1-12 12H292a12.01 12.01 0 0 1-12-12V292a12.01 12.01 0 0 1 12-12h184a12.01 12.01 0 0 1 12 12Z" />
                              <path d="M439.972 359.335A8 8 0 0 0 432 352h-16v-12a28.032 28.032 0 0 0-28-28h-8a28.032 28.032 0 0 0-28 28v12h-16a8 8 0 0 0-7.972 7.335l-8 96A8 8 0 0 0 328 464h112a8 8 0 0 0 7.972-8.665ZM368 340a12.013 12.013 0 0 1 12-12h8a12.013 12.013 0 0 1 12 12v12h-32Zm-31.306 108 6.667-80H352v8a8 8 0 0 0 16 0v-8h32v8a8 8 0 0 0 16 0v-8h8.639l6.667 80Z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-8">
                    <div className="mt-2">
                      <Datepicker
                        useRange={false}
                        primaryColor="teal"
                        asSingle={true}
                        value={dueDate}
                        inputClassName="w-full rounded-md !bg-slate-100 !border-0 py-2.5 pr-10 text-slate-900 ring-1 ring-inset !ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:!ring-inset focus:!ring-cyan-600 sm:text-sm sm:leading-6"
                        onChange={handleDateChanged}
                        placeholder={`${dayjs().format("YYYY-MM-DD")}`}
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="merchant"
                        className="block text-sm sr-only font-medium leading-6 text-gray-900"
                      >
                        Merchant
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="merchant"
                          id="merchant"
                          className="block w-full rounded-md bg-slate-100 border-0 py-2.5 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                          placeholder="Merchant"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="h-5 w-5 text-gray-400"
                          >
                            <path d="M143.5 326.255a7.5 7.5 0 0 0-7.5 7.5v13.5a7.5 7.5 0 0 0 15 0v-13.5a7.5 7.5 0 0 0-7.5-7.5z" />
                            <path d="M488.312 425.849h-12.143V217.76c20.115-3.56 35.445-21.155 35.445-42.276v-28.876c0-.147-.014-.291-.022-.436-.005-.081-.005-.162-.012-.243a7.517 7.517 0 0 0-.128-.871c-.003-.017-.009-.033-.013-.049a7.389 7.389 0 0 0-.224-.8c-.022-.066-.048-.132-.072-.197a7.436 7.436 0 0 0-.278-.655c-.019-.039-.031-.08-.05-.118L477.653 77.29V42.796c0-8.902-7.243-16.145-16.145-16.145H120.456a7.5 7.5 0 0 0 0 15h341.052c.631 0 1.145.514 1.145 1.145V71.64H49.347V42.796c0-.631.514-1.145 1.145-1.145H85.56a7.5 7.5 0 0 0 0-15H50.492c-8.902 0-16.145 7.243-16.145 16.145V77.29L1.186 143.239c-.019.039-.032.08-.05.118a7.436 7.436 0 0 0-.278.655c-.024.066-.05.131-.072.197a7.389 7.389 0 0 0-.224.8l-.013.049c-.06.285-.102.575-.128.871-.007.081-.007.162-.012.243-.008.145-.022.289-.022.436v28.876c0 21.12 15.33 38.716 35.445 42.276v208.089H23.688C10.626 425.849 0 436.476 0 449.538v23.722c0 6.666 5.423 12.089 12.089 12.089h487.822c6.666 0 12.089-5.423 12.089-12.089v-23.722c0-13.062-10.626-23.689-23.688-23.689zm8.301-250.364c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.536-27.945-27.945v-21.376h55.89v21.376zM465.565 86.64l26.382 52.468h-53.448L419.655 86.64h45.91zm-61.849 0 18.844 52.468h-54.17L357.083 86.64h46.633zm22.008 67.468v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.536-27.945-27.945v-21.376h55.89zM341.739 86.64l11.307 52.468h-54.62l-3.769-52.468h47.082zm13.095 67.468v21.376c0 15.409-12.536 27.945-27.944 27.945s-27.945-12.536-27.945-27.945v-21.376h55.889zM232.382 86.64h47.235l3.769 52.468h-54.773l3.769-52.468zm-4.327 67.468h55.89v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.536-27.945-27.945v-21.376zM256 218.429c14.704 0 27.701-7.431 35.445-18.732 7.744 11.301 20.741 18.732 35.445 18.732s27.701-7.431 35.444-18.732c7.744 11.301 20.741 18.732 35.445 18.732s27.701-7.431 35.445-18.732c6.396 9.334 16.379 16.016 27.945 18.063v208.089H178.836V259.185c0-7.692-6.258-13.95-13.95-13.95H78.177c-7.692 0-13.95 6.258-13.95 13.95v166.664H50.832V217.76c11.566-2.047 21.549-8.729 27.945-18.063 7.744 11.301 20.741 18.732 35.445 18.732s27.701-7.431 35.445-18.732c7.744 11.301 20.741 18.732 35.444 18.732s27.701-7.431 35.445-18.732c7.743 11.301 20.74 18.732 35.444 18.732zm-92.164 41.806v165.614H79.227V260.235h84.609zm-77.56-84.75v-21.376h55.89v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.537-27.945-27.945zm83.985-88.845h47.082l-3.769 52.468h-54.62l11.307-52.468zm-13.095 67.468h55.889v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.944-12.536-27.944-27.945v-21.376zm-2.25-67.468-11.307 52.468h-54.17l18.844-52.468h46.633zm-108.481 0h45.91l-18.844 52.468H20.053L46.435 86.64zm-31.048 88.845v-21.376h55.89v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.537-27.945-27.945zM15 470.349v-20.812c0-4.791 3.897-8.688 8.688-8.688h464.623c4.791 0 8.688 3.897 8.688 8.688v20.812H15z" />
                            <path d="M426.773 245.235H335.06a7.5 7.5 0 0 0 0 15h90.664V378.27H209.5V260.235h90.25a7.5 7.5 0 0 0 0-15h-91.3c-7.692 0-13.95 6.257-13.95 13.95v120.136c0 7.692 6.258 13.95 13.95 13.95h218.323c7.692 0 13.95-6.258 13.95-13.95V259.185c0-7.692-6.258-13.95-13.95-13.95z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="notes"
                        className="block text-sm sr-only font-medium leading-6 text-gray-900"
                      >
                        Notes
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="notes"
                          id="notes"
                          className="block w-full rounded-md bg-slate-100 border-0 py-2.5 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                          placeholder="Notes"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 text-gray-400"
                          >
                            <path d="M11 23.5a.5.5 0 0 1-.5.5h-6A4.505 4.505 0 0 1 0 19.5v-15C0 2.019 2.019 0 4.5 0h9C15.981 0 18 2.019 18 4.5v4a.5.5 0 0 1-1 0v-4C17 2.57 15.43 1 13.5 1h-9C2.57 1 1 2.57 1 4.5v15C1 21.43 2.57 23 4.5 23h6a.5.5 0 0 1 .5.5Zm3-18a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0 0 1h9a.5.5 0 0 0 .5-.5Zm-2 5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5ZM4.5 15a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM24 17.5c0 3.584-2.916 6.5-6.5 6.5S11 21.084 11 17.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5Zm-1 0c0-3.032-2.468-5.5-5.5-5.5S12 14.468 12 17.5s2.468 5.5 5.5 5.5 5.5-2.468 5.5-5.5Zm-3.347-.88-2.218 2.129a.878.878 0 0 1-1.224.002l-1.131-1.108a.5.5 0 0 0-.699.715l1.131 1.108c.362.354.838.531 1.312.531s.95-.178 1.31-.532l2.213-2.124a.5.5 0 0 0-.693-.721Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block text-sm sr-only font-medium leading-6 text-gray-900">
                              Recurring
                            </Listbox.Label>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-100 py-2.5 pl-3 pr-10 text-left text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">
                                  {selected.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6 text-gray-400"
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
                                      fill="url(#a)"
                                      fillRule="evenodd"
                                      d="M6.754 4.686A9 9 0 1 1 3 12a1 1 0 1 1 2 0 7 7 0 1 0 3.386-5.996h.368a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0zM12 7a1 1 0 0 1 1 1v3.586l2.207 2.207a1 1 0 0 1-1.414 1.414l-2.5-2.5A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1z"
                                      clipRule="evenodd"
                                      data-original="url(#a)"
                                    />
                                  </svg>
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {periods.map((period) => (
                                    <Listbox.Option
                                      key={period.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-slate-600 text-slate-100"
                                            : "text-slate-900",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                      value={period}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "block truncate"
                                            )}
                                          >
                                            {period.name}
                                          </span>

                                          {selected ? (
                                            <span
                                              className={classNames(
                                                active
                                                  ? "text-slate-100"
                                                  : "text-slate-600",
                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-around gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 rounded-md bg-teal-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                        >
                          Create
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 520 520"
                            className="-mr-0.5 h-5 w-5 text-slate-50 fill-current"
                          >
                            <path
                              d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                              data-name="7-Check"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 border border-slate-500 rounded-md py-2.5 px-3.5 text-sm font-semibold text-slate-500 shadow-sm hover:bg-slate-500 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                        >
                          Cancel
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 415.188 415.188"
                            className="-mr-0.5 h-5 w-5 fill-current"
                          >
                            <path d="M412.861 78.976c3.404-6.636 2.831-14.159-.15-20.404.84-7.106-1.02-14.321-7.746-19.855a59509.569 59509.569 0 0 1-18.781-15.457c-11.005-9.055-28.237-11.913-38.941 0-48.619 54.103-99.461 105.856-152.167 155.725-39.185-36.605-78.846-72.713-118.223-108.868-13.82-12.693-33.824-8.71-42.519 6.411-12.665 6.286-22.931 14.481-31.42 28.468-4.042 6.664-3.727 15.076 0 21.764 25.421 45.578 74.557 85.651 114.957 122.529-5.406 4.839-10.772 9.724-16.287 14.461-54.43 46.742-91.144 76.399-23.029 124.325.919.647 1.856.504 2.789.882 1.305.602 2.557 1.026 4.004 1.264.45.017.87.093 1.313.058 1.402.114 2.774.471 4.195.192 36.621-7.18 70.677-35.878 101.576-67.48 30.1 29.669 62.151 58.013 97.395 74.831 8.391 4.005 18.395 1.671 24.855-3.931 10.832.818 20.708-5.913 25.665-15.586.734-.454 1.207-.713 2.002-1.21 15.748-9.838 17.187-29.431 5.534-42.936-26.313-30.492-54.284-59.478-82.798-87.95 51.341-50.166 115.448-104.27 147.776-167.233z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>{" "}
        </div>
      </div>
      <CategoriesDialog isOpen={isCategoriesOpen} close={closeCategories} />
    </main>
  );
};
type CategoryForegroundColors = {
  "text-slate-900": true;
  "text-slate-50": true;
};
type CategoryBackgroundColors = {
  "bg-slate-300": true;
  "bg-gray-300": true;
  "bg-zinc-300": true;
  "bg-neutral-300": true;
  "bg-stone-300": true;
  "bg-red-300": true;
  "bg-orange-300": true;
  "bg-amber-300": true;
  "bg-yellow-300": true;
  "bg-lime-300": true;
  "bg-green-300": true;
  "bg-emerald-300": true;
  "bg-teal-300": true;
  "bg-cyan-300": true;
  "bg-sky-300": true;
  "bg-blue-300": true;
  "bg-indigo-300": true;
  "bg-violet-300": true;
  "bg-purple-300": true;
  "bg-fuchsia-300": true;
  "bg-pink-300": true;
  "bg-rose-300": true;
};
type Category = {
  name: string;
  foregroundColor: keyof CategoryForegroundColors;
  backgroundColor: keyof CategoryBackgroundColors;
  icon?: React.ReactNode;
};
const categories: Category[] = [
  {
    name: "Meal",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-slate-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410.121 410.121">
        <path
          d="M85.079 141.061a267.188 267.188 0 0 1-34.6-59.08 4 4 0 0 0-7.36 3.12 276.839 276.839 0 0 0 35.76 60.76 3.999 3.999 0 0 0 3.16 1.52 3.759 3.759 0 0 0 2.44-.84 4 4 0 0 0 .6-5.48zm-41.56-77.88c-1.16-3.72-2.2-7.44-3.08-11.04a4.012 4.012 0 1 0-7.8 1.88c.92 3.76 2.04 7.68 3.24 11.6a4 4 0 0 0 4 2.8 4.008 4.008 0 0 0 1.2-.2 4 4 0 0 0 2.44-5.04z"
          data-original="#000000"
        />
        <path
          d="M283.559 188.301c9.279 9.278 24.321 9.278 33.6 0l92-92a4 4 0 0 0-5.64-5.64l-.2.2-92 91.8c-6.212 6.046-16.108 6.046-22.32 0l-29.48-29.6c-6.046-6.212-6.046-16.108 0-22.32l92-91.8a4 4 0 0 0 0-5.64 4 4 0 0 0-5.657-.023l-.023.023-92 91.76c-9.147 9.332-9.147 24.268 0 33.6l3.36 3.36-45.28 38.12L19.639 7.861a4 4 0 0 0-6.64 1.68c-13.88 44.76 23.36 121.36 66.84 164.88a198.097 198.097 0 0 0 33.8 27.16 14.239 14.239 0 0 0 15.12 0 75.41 75.41 0 0 1 23.56-9.56 13.4 13.4 0 0 1 14.16 5.52l17.36 26.28-120.12 101.24a41.026 41.026 0 0 0-3.52 3.08c-14.815 14.864-14.776 38.925.089 53.74 14.822 14.773 38.798 14.782 53.631.02a36.269 36.269 0 0 0 3.48-4l93.28-113.32 50.92 77.16 24.36 36.96c1.04 1.32 2.04 2.44 3 3.44a37.278 37.278 0 0 0 26.32 10.92h1.8a36.801 36.801 0 0 0 26.84-13.32c11.935-15.13 10.717-36.784-2.84-50.48l-.56-.6a19.716 19.716 0 0 0-2.6-2.56l-28.84-29.04c-.3-.44-.68-.82-1.12-1.12l-24-24a4.007 4.007 0 0 0-1.16-1.12l-42.48-42.24 37.72-45.8 5.52 5.52zm-172.72 184.64a28.894 28.894 0 0 1-2.88 3.36c-12.122 11.295-31.105 10.625-42.4-1.497-10.735-11.521-10.735-29.382 0-40.903.92-.9 1.895-1.742 2.92-2.52l64 15.16-21.64 26.4zm28-33.48-62.24-14.72 21.72-18.32c.188.117.39.211.6.28h-.08l56 13.2-16 19.56zm21.6-26.4-54.64-12.96 82.48-69.56 17.8 27.04-45.64 55.48zm147.56-5.56 24.64 24.6c.136.097.284.178.44.24a13.265 13.265 0 0 1 1.68 1.68l.64.72c10.834 10.788 11.883 27.976 2.44 40-10.281 12.367-28.641 14.059-41.008 3.778a29.317 29.317 0 0 1-1.952-1.778c-.88-.88-1.64-1.8-2.2-2.48l-.32-.52 15.64-66.24zm-6.92-6.8-15.08 63.68-16.8-25.48 13.48-56.68 18.4 18.48zm-25.04-25.12-12.8 54.16-90.16-136.68a21.239 21.239 0 0 0-17.64-9.36h-.12a22.742 22.742 0 0 0-4.88.52 83.037 83.037 0 0 0-26.08 10.6 6.24 6.24 0 0 1-6.56 0 193.12 193.12 0 0 1-32.44-26.12c-38.84-38.84-73.84-108-66.44-150.16l257.12 257.04zm-41.4-52.72-17.04-17.04 43.24-36.52 9.8 9.84-36 43.72z"
          data-original="#000000"
        />
        <path
          d="M370.039 52.861a4 4 0 0 0-5.64.2l-82.56 82.36a4 4 0 0 0 5.64 5.64l82.56-82.56a4 4 0 0 0 0-5.64zm19.24 19.24a4.017 4.017 0 0 0-5.68 0l-82.52 82.56a4 4 0 0 0 0 5.64 4 4 0 0 0 2.8 1.2 4 4 0 0 0 2.84-1.2l82.56-82.52a4.015 4.015 0 0 0 0-5.68zm-86.04-37.32C234.465-7.115 147.244-3.55 82.119 43.821a4 4 0 0 0-1.04 5.56 4 4 0 0 0 3.24 1.68 3.997 3.997 0 0 0 2.48-.8c62.522-45.443 146.231-48.851 212.24-8.64a4.013 4.013 0 1 0 4.2-6.84zM44.374 317.282l-.015-.021a189.92 189.92 0 0 1-36.36-112.2 189.512 189.512 0 0 1 18.64-82.44 4.001 4.001 0 1 0-7.2-3.48c-31.435 65.893-24.362 143.695 18.44 202.84a4 4 0 0 0 3.24 1.64 3.995 3.995 0 0 0 2.32-.76 4 4 0 0 0 .935-5.579zm230.141 68.101a4 4 0 0 0-4.956-2.162 192.523 192.523 0 0 1-131.52 3.2 4.001 4.001 0 0 0-2.56 7.56 200.281 200.281 0 0 0 137-3.32 4 4 0 0 0 2.036-5.278zm115.204-240.002a4 4 0 0 0-5-2.64 4 4 0 0 0-2.654 4.996l.014.044a192 192 0 0 1-28.64 170.92 4 4 0 0 0 .833 5.595l.007.005a3.763 3.763 0 0 0 2.36.8 4 4 0 0 0 3.24-1.64 199.999 199.999 0 0 0 29.84-178.08z"
          data-original="#000000"
        />
      </svg>
    ),
  },
  {
    name: "Grocery",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-gray-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="m145.736 377.191-2.159-10.249a7.5 7.5 0 0 0-8.887-5.794 7.5 7.5 0 0 0-5.794 8.887l2.159 10.248a7.505 7.505 0 0 0 7.333 5.958 7.501 7.501 0 0 0 7.348-9.05zM162.791 458.152l-9.859-46.799a7.501 7.501 0 1 0-14.681 3.092l9.859 46.799a7.505 7.505 0 0 0 7.333 5.958 7.5 7.5 0 0 0 7.348-9.05zM229.913 457.626l-6.405-91.21c-.29-4.133-3.878-7.254-8.009-6.958a7.502 7.502 0 0 0-6.958 8.009l6.405 91.211a7.5 7.5 0 0 0 8.009 6.957 7.501 7.501 0 0 0 6.958-8.009zM298.857 432.981c-4.126-.3-7.719 2.825-8.009 6.958l-1.279 18.214a7.502 7.502 0 0 0 7.491 8.027 7.502 7.502 0 0 0 7.476-6.976l1.279-18.214a7.501 7.501 0 0 0-6.958-8.009zM303.983 359.985c-4.122-.292-7.719 2.825-8.009 6.958l-2.681 38.177a7.502 7.502 0 0 0 14.967 1.051l2.681-38.177a7.502 7.502 0 0 0-6.958-8.009zM377.469 359.601c-4.055-.858-8.033 1.741-8.887 5.794l-19.214 91.21a7.5 7.5 0 0 0 7.348 9.051 7.504 7.504 0 0 0 7.333-5.958l19.214-91.21a7.502 7.502 0 0 0-5.794-8.887z" />
        <path d="M481.195 279.919h-38.664v-75.04a20.05 20.05 0 0 0-2.264-9.235l-16.334-31.316c6.539-1.642 11.401-7.552 11.401-14.593v-11.088c0-8.305-6.756-15.062-15.061-15.062H316.389c-8.305 0-15.062 6.757-15.062 15.062v10.977a68.403 68.403 0 0 0-10.921-15.259c-9.423-9.94-14.613-22.957-14.613-36.654v-7.373c2.069-1.847 3.38-4.525 3.38-7.509v-72.75C279.174 4.521 274.653 0 269.096 0h-45.108c-5.557 0-10.078 4.521-10.078 10.078v72.75c0 2.985 1.312 5.662 3.38 7.509v7.373c0 13.697-5.19 26.714-14.613 36.654-12.078 12.739-18.729 29.422-18.729 46.976v61.317l-8.851-51.734a42.942 42.942 0 0 0-20.469-29.75 42.942 42.942 0 0 0-35.924-3.667l-4.652 1.601c-3.458-22.572.641-46.602.693-46.899a7.502 7.502 0 0 0-6.086-8.686 7.5 7.5 0 0 0-8.691 6.086c-.21 1.192-3.756 21.847-1.672 44.21L74.46 84.556a7.503 7.503 0 0 0-14.188 4.882l21.18 61.543c-.457-.825-.921-1.653-1.397-2.487-13.678-23.992-27.644-38.852-41.511-44.168a7.502 7.502 0 0 0-5.371 14.009c16.589 6.36 32.91 34.096 42.428 54.006l-5.306 1.826a42.946 42.946 0 0 0-26.059 24.999 42.946 42.946 0 0 0 2.175 36.046l24.046 44.707H30.804c-8.83 0-16.014 7.184-16.014 16.014v21.151c0 8.83 7.184 16.014 16.014 16.014h17.084l33.351 150.845C84.892 500.463 99.259 512 116.177 512h279.644c16.919 0 31.286-11.537 34.938-28.057l33.352-150.845h17.084c8.83 0 16.014-7.184 16.014-16.014v-21.151c0-8.83-7.184-16.014-16.014-16.014zm-54.231-77.335c.369.706.563 1.499.563 2.296v75.04h-11.884v-51.427c0-5.838-4.75-10.589-10.589-10.589h-73.446c-5.839 0-10.589 4.75-10.589 10.589v51.427h-11.884v-75.04c0-.796.194-1.589.563-2.296l19.708-37.787h77.849l19.709 37.787zm-26.325 30.323v47.012h-64.616v-47.012h64.616zm-84.25-94.317 103.942.058-.038 11.144-.02.001-103.942-.058.058-11.145zm-3.66 25.738-4.193 8.04a68.035 68.035 0 0 0-2.658-11.866 15.044 15.044 0 0 0 6.851 3.826zM228.913 15.004h35.256v62.898h-35.256V15.004zm-15.349 129.684c12.077-12.74 18.729-29.423 18.729-46.977v-4.805h28.496v4.805c0 17.554 6.652 34.238 18.729 46.977 9.423 9.939 14.613 22.956 14.613 36.653v18.797h-57.067c-8.336 0-15.117 6.782-15.117 15.117v64.664h-22.996v-98.578h-.001c0-13.697 5.19-26.714 14.614-36.653zm80.568 70.455v64.777h-57.18v-64.664c0-.063.051-.113.113-.113h57.067zM66.307 240.529l-6.682-12.424a27.963 27.963 0 0 1-1.416-23.472 27.963 27.963 0 0 1 16.968-16.279l48.409-16.66a27.963 27.963 0 0 1 23.392 2.387 27.965 27.965 0 0 1 13.329 19.372l14.793 86.465h-66.133l13.499-4.646a7.501 7.501 0 0 0 4.652-9.535 7.502 7.502 0 0 0-9.535-4.653l-33.936 11.68-10.137-18.847 45.871-15.787a7.501 7.501 0 0 0 4.652-9.535 7.502 7.502 0 0 0-9.535-4.653l-48.191 16.587zm349.802 240.175c-2.121 9.592-10.463 16.292-20.288 16.292H116.177c-9.824 0-18.167-6.7-20.287-16.292L63.254 333.098h385.491l-32.636 147.606zm66.097-163.62a1.013 1.013 0 0 1-1.011 1.01H30.804c-.557 0-1.01-.453-1.01-1.01v-21.151c0-.557.453-1.01 1.01-1.01h450.391c.557 0 1.01.453 1.01 1.01v21.151z" />
      </svg>
    ),
  },
  {
    name: "Shopping",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-zinc-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682.667 682.667">
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
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M202.5 37.5c0-16.568-13.432-30-30-30-16.568 0-30 13.432-30 30 0 16.568 13.432 30 30 30 16.568 0 30-13.432 30-30Z"
          />
          <path d="M180 37.5c0-4.143-3.357-7.5-7.5-7.5a7.499 7.499 0 0 0-7.5 7.5c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5M437 37.5c0-4.143-3.357-7.5-7.5-7.5a7.499 7.499 0 0 0-7.5 7.5c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5" />
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M459.5 37.5c0-16.568-13.432-30-30-30-16.568 0-30 13.432-30 30 0 16.568 13.432 30 30 30 16.568 0 30-13.432 30-30ZM105.55 482.55l-21.216-21.216M331 217.5c0-16.568-13.432-30-30-30H176.46l-56.314-31.93c-4.72-2.672-7.646-7.677-7.646-13.07 0-8.271 6.729-15 15-15h332c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15h-332c-24.812 0-45 20.187-45 45 0 16.181 8.759 31.19 22.857 39.173l49.772 28.22-59.025 230.779C91.017 460.592 73.087 474.5 52.5 474.5h-30c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15h30c34.307 0 64.189-23.192 72.67-56.4l58.978-230.6h231.709c20.559 0 38.504 13.934 43.597 33.852L504.5 427.5H130.438M216.28 357.5H148.34M486.6 357.5H246.28M166.245 287.5h302.453M397.54 217.5l32.219 210M344.281 217.5l10.737 210M291.023 217.5l-10.746 210M237.766 217.5l-32.23 210"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Transport",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-neutral-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002">
        <path d="M457.671 66.577h-6.538v-1.201c0-24.813-20.187-45-45-45H105.866c-24.813 0-45 20.187-45 45v1.201h-6.538C24.372 66.577 0 90.948 0 120.905v119.953c0 8.284 6.716 15 15 15s15-6.716 15-15V120.905c0-13.415 10.914-24.328 24.329-24.328h6.538v290.096c0 20.051 13.184 37.075 31.337 42.873v21.466c0 22.395 18.219 40.614 40.614 40.614 22.395 0 40.614-18.22 40.614-40.614v-19.339h165.139v19.339c0 22.395 18.219 40.614 40.614 40.614 22.394 0 40.613-18.22 40.613-40.614v-21.466c18.152-5.798 31.337-22.822 31.337-42.873V96.577h6.538c13.415 0 24.329 10.913 24.329 24.328v119.953c0 8.284 6.716 15 15 15s15-6.716 15-15V120.905c-.002-29.957-24.374-54.328-54.331-54.328zM143.432 451.012c-.001 5.853-4.762 10.614-10.615 10.614-5.852 0-10.613-4.762-10.613-10.614v-19.339h21.228v19.339zm246.366 0c-.001 5.853-4.762 10.614-10.614 10.614-5.853 0-10.614-4.762-10.614-10.614v-19.339h21.228v19.339zm31.336-64.339c0 8.272-6.729 15-15 15H105.866c-8.271 0-15-6.729-15-15V260.142h330.268v126.531zm0-156.531H90.866v-111.04h330.268v111.04zm0-141.039H90.866V65.376c0-8.271 6.729-15 15-15h300.268c8.271 0 15 6.729 15 15v23.727z" />
        <path d="M370.644 302.842c-8.284 0-15 6.716-15 15v35.976c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-35.976c0-8.284-6.716-15-15-15zM141.356 302.842c-8.284 0-15 6.716-15 15v35.976c0 8.284 6.716 15 15 15s15-6.716 15-15v-35.976c0-8.284-6.716-15-15-15z" />
      </svg>
    ),
  },
  {
    name: "Bank Transfer",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-stone-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g fill-rule="evenodd">
          <path
            fill="transparent"
            d="M123.337 409.769h265.325V163.4h-63.386a6.388 6.388 0 0 1-6.388-6.388v-47.255a6.388 6.388 0 0 1 6.388-6.387h63.386V43.762h.025a15.116 15.116 0 0 0-15.011-14.986H138.323a15.047 15.047 0 0 0-14.986 14.986v267.8h63.387a6.389 6.389 0 0 1 6.388 6.388v47.25a6.388 6.388 0 0 1-6.388 6.388h-63.387z"
            data-original="#ffffff"
          />
          <path
            fill="transparent"
            d="M331.664 150.621h100.825a6.389 6.389 0 0 1 6.388 6.388v10.062l40.723-33.688L438.877 99.7v10.061a6.389 6.389 0 0 1-6.388 6.388H331.664zM180.336 324.335H79.511a6.388 6.388 0 0 1-6.388-6.388v-10.061L32.4 341.574l40.725 33.687V365.2a6.389 6.389 0 0 1 6.388-6.388h100.823z"
            data-original="#37b877"
          />
          <path
            fill="transparent"
            d="M304.672 188.806a68.835 68.835 0 1 0 20.16 48.672 68.617 68.617 0 0 0-20.16-48.672z"
            data-original="#fac05c"
          />
          <path
            fill="transparent"
            d="M388.662 422.545H123.337v45.693a15.047 15.047 0 0 0 14.986 14.986h235.353a15.107 15.107 0 0 0 15.011-14.986h-.025z"
            data-original="#6eb0ea"
          />
          <path
            fill="#f7f7f8"
            d="M274.156 450.638h-36.312a3.85 3.85 0 0 0 0 7.7h36.312a3.85 3.85 0 0 0 0-7.7z"
            data-original="#f7f7f8"
          />
          <path
            d="M331.664 150.621h100.825a6.389 6.389 0 0 1 6.388 6.388v10.062l40.723-33.688L438.877 99.7v10.061a6.389 6.389 0 0 1-6.388 6.388H331.664v34.476zM180.336 324.335H79.511a6.388 6.388 0 0 1-6.388-6.388v-10.061L32.4 341.574l40.725 33.687V365.2a6.389 6.389 0 0 1 6.388-6.388h100.823zm124.336-135.529a68.835 68.835 0 1 0 20.16 48.672 68.617 68.617 0 0 0-20.16-48.672zM256 155.87a81.61 81.61 0 1 1-57.7 23.9 81.357 81.357 0 0 1 57.7-23.9zm6.388 127.787a6.388 6.388 0 0 1-12.776 0v-8.232a29.655 29.655 0 0 1-5.511-1.6 24.232 24.232 0 0 1-12.844-11.338 6.36 6.36 0 1 1 11.378-5.689 11.575 11.575 0 0 0 6.207 5.2 17.68 17.68 0 0 0 10.226.8 17.415 17.415 0 0 0 1.787-.472 12.5 12.5 0 0 0 6.466-4.569 7.015 7.015 0 0 0 1.2-5.487 7.766 7.766 0 0 0-.188-.741c-1.845-5.544-7.633-6.531-13.419-7.518-9.531-1.625-19.06-3.25-23.332-16.083a20.226 20.226 0 0 1-.586-2.088 19.49 19.49 0 0 1 3.149-15.319 25.305 25.305 0 0 1 13-9.46q1.311-.435 2.458-.72V191.3a6.388 6.388 0 1 1 12.776 0v8.732a29.491 29.491 0 0 1 5.512 1.6 24.23 24.23 0 0 1 12.844 11.337 6.361 6.361 0 0 1-11.379 5.69 11.569 11.569 0 0 0-6.206-5.2 17.666 17.666 0 0 0-10.2-.8v.005a17.882 17.882 0 0 0-1.811.471 12.51 12.51 0 0 0-6.467 4.569 7.018 7.018 0 0 0-1.2 5.488c.072.333.135.581.188.74 1.839 5.529 7.619 6.515 13.4 7.5 9.535 1.626 19.074 3.252 23.35 16.1a20.255 20.255 0 0 1 .587 2.088 19.494 19.494 0 0 1-3.149 15.319 25.309 25.309 0 0 1-13 9.459q-1.276.425-2.459.715v8.543zm126.274 138.888H123.337v45.693a15.047 15.047 0 0 0 14.986 14.986h235.353a15.107 15.107 0 0 0 15.011-14.986h-.025zm-265.325-12.776v-38.182h63.387a6.388 6.388 0 0 0 6.388-6.388v-47.252a6.389 6.389 0 0 0-6.388-6.388h-63.387V43.762a15.047 15.047 0 0 1 14.986-14.986h235.353a15.116 15.116 0 0 1 15.011 14.986h-.025v59.608h-63.386a6.388 6.388 0 0 0-6.388 6.387v47.252a6.388 6.388 0 0 0 6.388 6.388h63.386v246.372zm-12.776 6.409v-44.591H85.9v17.238h-.008a6.38 6.38 0 0 1-10.447 4.916L18.41 346.563a6.383 6.383 0 0 1-.089-9.9L75.2 289.606a6.387 6.387 0 0 1 10.7 4.716v17.237h24.662V43.762A27.826 27.826 0 0 1 138.323 16h235.353a27.809 27.809 0 0 1 27.737 27.762h.025v59.608H426.1V86.132h.008a6.38 6.38 0 0 1 10.447-4.916l57.034 47.178a6.383 6.383 0 0 1 .089 9.905L436.8 185.351a6.387 6.387 0 0 1-10.7-4.716V163.4h-24.662v304.838h-.025A27.8 27.8 0 0 1 373.676 496H138.323a27.826 27.826 0 0 1-27.762-27.762zM237.547 63.24h36.905a6.388 6.388 0 0 0 0-12.776h-36.9a6.388 6.388 0 0 0 0 12.776zm36.609 387.4a3.85 3.85 0 0 1 0 7.7h-36.312a3.85 3.85 0 0 1 0-7.7zm-36.312-12.776h36.312a16.626 16.626 0 0 1 0 33.252h-36.312a16.626 16.626 0 0 1 0-33.252z"
            data-original="#000000"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Entertainment",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-red-300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 477.831 477"
        className="fill-current"
      >
        <path d="m447.535 18.277-7.703-1.918a537.973 537.973 0 0 0-260 0l-7.695 1.918c-17.82 4.434-30.325 20.446-30.305 38.809v55.703a538.363 538.363 0 0 0-114.266 47.113l-6.984 3.848c-16.066 8.875-23.992 27.578-19.2 45.297l23.282 87.055c20.988 78.132 78.746 141.125 154.766 168.8l24 8.801c28.468 10.238 60.3 1.692 79.808-21.433l16.387-19.575a243.497 243.497 0 0 0 37.168-60.195 71.356 71.356 0 0 0 14.328-7.535l20.926-14.649c66.27-46.433 105.746-122.257 105.785-203.175V57.086c.02-18.36-12.48-34.371-30.297-38.809zm-160.16 404.137-16.39 19.59c-15.18 17.984-39.938 24.633-62.083 16.664l-24-8.797c-71.113-25.894-125.144-84.824-144.78-157.914l-23.29-87.055a23.886 23.886 0 0 1 11.504-27.136l6.977-3.848a522.487 522.487 0 0 1 106.519-44.48v17.703a248.186 248.186 0 0 0 85.094 186.882 151.211 151.211 0 0 1-44.063 10.582l-60.16 4.88a8.002 8.002 0 0 0-2.648 15.273l79.754 36c17.367 7.87 37.875 2.387 49-13.106l17.453-24.277 2.281 1.598a71.96 71.96 0 0 0 41.289 12.96c2.398 0 4.719-.304 7.078-.535a228.364 228.364 0 0 1-29.535 45.016zm-46.344-76.992c2.184 1.601 4.313 3.328 6.559 4.894l5.539 3.875-17.344 24.133c-6.68 9.285-18.984 12.567-29.402 7.84l-51.496-23.2 29.265-2.398a167.515 167.515 0 0 0 56.88-15.144zM461.832 147.14c-.031 75.699-36.96 146.625-98.953 190.066l-20.926 14.648c-19.305 13.45-44.941 13.45-64.242 0l-20.918-14.648c-61.996-43.437-98.93-114.367-98.961-190.066V57.086a23.997 23.997 0 0 1 18.176-23.281l7.703-1.926a521.789 521.789 0 0 1 252.242 0l7.703 1.926a24.001 24.001 0 0 1 18.176 23.28zm0 0" />
        <path d="m280.176 149.758 10.91-11.711c-25.012-24.953-65.5-24.953-90.512 0l-.398.398 11.71 10.914a48.005 48.005 0 0 1 34.227-14.066 48.016 48.016 0 0 1 34.063 14.465zM328.574 138.047l-.398.398 11.71 10.914a48.005 48.005 0 0 1 34.227-14.066 48.016 48.016 0 0 1 34.063 14.465l10.91-11.711c-25.012-24.953-65.5-24.953-90.512 0zM114.07 265.703a48 48 0 0 1 36.97 5.102l7.456-14.168c-30.61-17.672-69.75-7.188-87.426 23.418l-.277.488 6.918 4 7.2 3.504a47.644 47.644 0 0 1 29.16-22.344zM396.398 224.23l-59.367 10.801a151.539 151.539 0 0 1-54.398 0l-59.38-10.8a7.996 7.996 0 0 0-8.69 4.515 7.995 7.995 0 0 0 2.195 9.547l67.746 55.41c14.75 12.008 35.906 12.008 50.656 0l67.735-55.426a7.998 7.998 0 0 0-6.496-14.063zm-71.367 57.102c-8.847 7.215-21.55 7.215-30.398 0l-43.793-35.824 28.933 5.258a167.062 167.062 0 0 0 60.098 0l28.938-5.258zm0 0" />
      </svg>
    ),
  },
  {
    name: "Housing",
    foregroundColor: "text-slate-50",
    backgroundColor: "bg-orange-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="m498.147 222.58-57.298-57.298V15c0-8.284-6.716-15-15-15h-64.267c-8.284 0-15 6.716-15 15v56.017l-57.174-57.174C280.482 4.916 268.614 0 255.99 0c-12.625 0-24.494 4.916-33.42 13.843L13.832 222.582c-18.428 18.427-18.428 48.411 0 66.838 8.927 8.927 20.795 13.843 33.419 13.843 2.645 0 5.253-.229 7.812-.651v154.223c0 30.419 24.748 55.166 55.167 55.166h97.561c8.284 0 15-6.716 15-15V383.467h66.4V497c0 8.284 6.716 15 15 15h97.56c30.419 0 55.166-24.747 55.166-55.166V302.611c2.558.423 5.165.651 7.81.651h.003c12.622 0 24.49-4.916 33.419-13.844 8.926-8.926 13.842-20.794 13.843-33.418-.002-12.624-4.918-24.493-13.845-33.42zM376.583 30h34.267v105.283l-34.267-34.268zm25.167 452h-82.56V368.467c0-8.284-6.716-15-15-15h-96.4c-8.284 0-15 6.716-15 15V482h-82.561c-13.877 0-25.167-11.289-25.167-25.166V285.025L255.99 114.101l170.926 170.926v171.808c0 13.876-11.289 25.165-25.166 25.165zm75.186-213.795a17.155 17.155 0 0 1-12.208 5.058 17.156 17.156 0 0 1-12.204-5.055l-.004-.004L266.597 82.281c-5.856-5.859-15.354-5.857-21.213 0L59.459 268.203l-.005.005c-3.26 3.26-7.593 5.055-12.203 5.055s-8.945-1.795-12.206-5.056c-6.73-6.73-6.73-17.682 0-24.412L243.783 35.056A17.152 17.152 0 0 1 255.99 30c4.61 0 8.945 1.796 12.205 5.056l82.781 82.78 125.958 125.957c6.731 6.73 6.731 17.683.002 24.412z" />
      </svg>
    ),
  },
  {
    name: "Travel",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-amber-300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Line Expand"
        viewBox="0 0 64 64"
      >
        <path d="M63.729 5.725A5.018 5.018 0 0 0 58.275.271a31.538 31.538 0 0 0-22.292 12.407l-.914 1.213-3.925-1.191.377-.377a2.25 2.25 0 0 0-3.182-3.182l-2.082 2.082-2.715-.821.554-.554a2.25 2.25 0 1 0-3.182-3.178l-2.258 2.258-2.715-.82.377-.377a2.25 2.25 0 0 0-3.182-3.182L11.054 6.63l-2.828-.855a.749.749 0 0 0-.747.188l-4.95 4.95a.749.749 0 0 0 .13 1.164l22.886 14.454L12.989 43.2 4 41.058a.748.748 0 0 0-.7.2L.47 44.085a.75.75 0 0 0 .13 1.166l7.369 4.605-.878 1.166a4.223 4.223 0 0 0-.1 4.92L5.47 57.47a.75.75 0 0 0 1.06 1.06L8.058 57a4.227 4.227 0 0 0 4.92-.1l1.165-.877 4.606 7.377a.75.75 0 0 0 1.166.133l2.828-2.833a.748.748 0 0 0 .2-.7L20.8 51.011l16.669-12.556 14.454 22.886a.749.749 0 0 0 1.164.13l4.95-4.95a.75.75 0 0 0 .188-.748l-.855-2.827 2.081-2.082a2.25 2.25 0 1 0-3.182-3.182l-.377.377-.82-2.715 2.258-2.258a2.25 2.25 0 0 0-3.182-3.186l-.554.554-.821-2.715 2.082-2.082a2.25 2.25 0 0 0-3.182-3.182l-.377.378-1.187-3.926 1.213-.914A31.542 31.542 0 0 0 63.729 5.725zM29.4 10.206a.75.75 0 0 1 1.061 1.06l-.945.945-1.629-.492zm-7.425-2.475a.75.75 0 1 1 1.06 1.06l-1.122 1.122-1.628-.492zM14.2 5.609a.75.75 0 0 1 1.057 1.061l-.945.945-1.629-.492zm-9.943 5.7 3.965-3.968 25.885 7.826-7.656 10.162zM2.2 44.479l1.866-1.865L12 44.5l-3.127 4.15zm19.19 15.459L19.521 61.8l-4.175-6.681L19.5 52zm35.94-11.195a.75.75 0 1 1 1.061 1.057l-1.514 1.513-.492-1.629zm-2.121-7.778a.75.75 0 0 1 1.06 1.06l-1.69 1.691-.492-1.629zm-2.475-7.425a.75.75 0 0 1 1.06 1.061l-1.513 1.513-.493-1.628zm3.925 22.238-3.969 3.969-14.02-22.2 10.162-7.656zm-44.584-.07a2.71 2.71 0 0 1-2.923.2l5.377-5.376a.75.75 0 0 0-1.061-1.061l-5.376 5.376a2.708 2.708 0 0 1 .2-2.922l28.89-38.344A30.032 30.032 0 0 1 58.411 1.765a3.519 3.519 0 0 1 3.824 3.824 30.036 30.036 0 0 1-11.816 21.229z" />
      </svg>
    ),
  },
  {
    name: "Phone & Internet",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-yellow-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <g data-name="Layer 6">
          <path d="M20 58h12v2H20zM12 8h2v10h-2zM12 20h2v2h-2z" />
          <path d="M56 32a20.02 20.02 0 0 0-12-18.318V5a5.006 5.006 0 0 0-5-5H13a5.006 5.006 0 0 0-5 5v54a5.006 5.006 0 0 0 5 5h26a5.006 5.006 0 0 0 5-5v-8.682A20.02 20.02 0 0 0 56 32ZM36 50c-2.587 0-4.927-2.945-6.4-7.383a33.5 33.5 0 0 1 12.8 0C40.927 47.055 38.587 50 36 50Zm6.4-28.617A33.552 33.552 0 0 1 36 22a33.552 33.552 0 0 1-6.4-.617C31.073 16.945 33.413 14 36 14s4.927 2.945 6.4 7.383ZM45.976 31a37.161 37.161 0 0 0-1.055-8.14 23.951 23.951 0 0 0 5.173-2.023A17.891 17.891 0 0 1 53.949 31Zm-2 0H28.023a35.535 35.535 0 0 1 1.009-7.682A35.53 35.53 0 0 0 36 24a35.53 35.53 0 0 0 6.968-.682A35.535 35.535 0 0 1 43.977 31ZM27.63 20.928a22.534 22.534 0 0 1-4.363-1.638 18.023 18.023 0 0 1 7.621-4.54 18.254 18.254 0 0 0-3.258 6.178Zm-5.724-.091a23.951 23.951 0 0 0 5.173 2.023A37.161 37.161 0 0 0 26.024 31h-7.973a17.891 17.891 0 0 1 3.855-10.163ZM26.024 33a37.161 37.161 0 0 0 1.055 8.14 23.951 23.951 0 0 0-5.173 2.023A17.891 17.891 0 0 1 18.051 33Zm1.606 10.072a18.254 18.254 0 0 0 3.258 6.178 18.023 18.023 0 0 1-7.621-4.54 22.534 22.534 0 0 1 4.363-1.638ZM36 40a35.53 35.53 0 0 0-6.968.682A35.535 35.535 0 0 1 28.023 33h15.954a35.535 35.535 0 0 1-1.009 7.682A35.53 35.53 0 0 0 36 40Zm9.976-7h7.973a17.891 17.891 0 0 1-3.855 10.163 23.951 23.951 0 0 0-5.173-2.023A37.161 37.161 0 0 0 45.976 33Zm2.757-13.71a22.534 22.534 0 0 1-4.363 1.638 18.254 18.254 0 0 0-3.258-6.178 18.023 18.023 0 0 1 7.621 4.54ZM33.382 2l-1 2H19.618l-1-2ZM42 59a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h3.382l1.723 3.447A1 1 0 0 0 19 6h14a1 1 0 0 0 .9-.553L35.618 2H39a3 3 0 0 1 3 3v7.922a20 20 0 1 0 0 38.156Zm-.888-9.75a18.254 18.254 0 0 0 3.258-6.178 22.534 22.534 0 0 1 4.363 1.638 18.023 18.023 0 0 1-7.621 4.54Z" />
        </g>
      </svg>
    ),
  },
  {
    name: "Personal Care",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-lime-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682.667 682.667">
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
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M160.645 395.337c-14.91 123.676 142.636 136.035 147.965 63.354M278.195 408.405c-39.202 10.602-91.047 1.39-117.55-18.454M331.457 415.917c-.17-34.243-24.377-58.394-55.53-52.583"
          />
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M172.975 322.685c39.94 56.75 126.11 56.75 166.05-.028M183.038 218.256c18.793-24.718 51.362-46.913 72.962-45.75 21.571-1.163 54.141 21.032 72.962 45.75"
          />
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M363.544 377.14c-5.471 15.022-16.016 28.46-32.087 38.777-.17 25.342-17.773 49.124-47.394 49.833-69.08 1.616-118.826-40.082-131.072-92.38M371.764 331.841l-2.21-34.328c-.54-8.787-8.165-15.505-16.923-14.967M140.236 331.841l2.183-34.328c.567-8.787 8.163-15.505 16.95-14.967M237.944 63.796h-83.762c-3.005 0-5.47-2.466-5.47-5.5V7.5m214.577 0v50.796c0 3.034-2.466 5.5-5.5 5.5h-85.235"
          />
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M216.344 187.075V164.03c0-3.572-1.928-5.046-5.187-5.868-37.757-9.667-107.686-26.589-110.69-76.65l-3.345-65.508C96.725 9.23 98.426 7.5 105.484 7.5h301.032c7.058 0 8.76 1.73 8.362 8.504l-3.345 65.508c-3.033 50.061-72.934 66.983-110.719 76.65-3.23.822-5.158 2.296-5.158 5.868v23.045M287.35 293.715c4.82-4.706 12.586-4.706 17.377 0M224.621 293.715c-4.79-4.706-12.557-4.706-17.376 0M433.36 412.373l-9.837-33.052c-7.597-25.54-11.82-32.372-12.699-53.12-1.814-22.253 2.523-42.974-20.267-61.343l-47.139-43.994c-6.18-5.783-15.987-4.366-21.259 2.268-5.273 6.633-3.033 15.108 2.07 21.883l28.401 37.532c-8.758.537-15.448 8.163-14.938 16.922l1.39 24.066c1.161 20.154 5.895 38.07 21.797 51.478 5.67 4.79 10.176 6.378 14.06 17.15l1.502 4.138L408.585 504.5m52.156 0-17.177-57.798M51.258 504.5l37.19-125.178c7.597-25.541 11.85-32.372 12.727-53.122 1.814-22.252-2.55-42.973 20.267-61.342l47.111-43.994c6.208-5.782 15.987-4.365 21.288 2.268 5.272 6.633 3.033 15.109-2.098 21.884l-28.374 37.53c8.76.539 15.45 8.164 14.938 16.923l-1.389 24.067c-1.162 20.154-5.924 38.069-21.798 51.477-5.669 4.791-10.176 6.378-14.059 17.15l-1.503 4.138L103.414 504.5M269.946 230.786c-7.71-4.706-20.21-4.706-27.893 0"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Health Care",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-green-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682.667 682.667">
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
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="30"
            d="m256 398.466-16.831 16.83c-46.478 46.479-121.833 46.479-168.311 0-46.478-46.476-46.478-121.832 0-168.31L256 61.846l185.142 185.142c46.478 46.477 46.478 121.833 0 168.31-46.478 46.478-121.833 46.478-168.311 0zM355 256h142M15 256h121M136 256l42 100M254 206l-76 150M254 206l63 110M355 256l-38 60"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Education",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-emerald-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.2 349.2">
        <path d="m337.6 114.25-139.2-68c-12-6-32.4-6-44.4 0l-142.4 68c-10 4.8-11.6 11.6-11.6 15.2 0 3.6 1.6 10 11.6 15.2l11.6 5.6v64c-7.2 2.8-12.4 10-12.4 18s5.2 15.2 12 18l-18 57.2h50.4l-18-57.2c7.2-2.8 12-10 12-18 0-8.4-5.2-15.2-12.4-18v-57.2l21.2 10.4v83.2c0 1.2.4 2.4 1.2 3.6 2 2.4 39.2 53.2 115.2 53.2s113.2-51.2 114.8-53.2c.8-1.2 1.2-2.4 1.2-3.6v-82.8l47.2-23.2c10-4.8 11.6-11.6 11.6-15.2-.4-3.6-1.6-10.4-11.6-15.2zm-60 134.4c-6.4 8-40.8 46.4-103.2 46.4-62.4 0-96.8-38.4-103.2-46.4v-75.6l82.8 39.6c6 2.8 14 4.4 22 4.4 8.4 0 16.4-1.6 22.4-4.8l79.2-38.8v75.2zm54.4-115.2-48 23.6c-2 0-3.6.8-4.4 2.4l-86.8 42c-8.4 4.4-24.8 4.4-33.6 0l-106.8-51.2 122.8-14.4c3.6-.4 6-3.6 5.6-6.8-.4-3.6-3.6-6-6.8-5.6l-142.4 16.8-14.4-6.8c-3.6-1.6-4.4-3.6-4.4-3.6 0-.4.8-2 4.4-3.6l142.4-68.4c4.4-2 10.4-3.2 16.4-3.2 6.4 0 12.8 1.2 16.8 3.2l139.2 68c3.6 1.6 4.4 3.2 4.4 4 0 0-1.2 2-4.4 3.6z" />
      </svg>
    ),
  },
  {
    name: "Gift",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-teal-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="m449.603 177.797-50.188-18.267c18.146-14.994 25.894-38.777 20.339-61.377-10.917-44.403-65.056-61.259-99.26-31.022l-34.652 30.632-6.855-45.94c-6.778-45.229-59.141-66.989-95.978-40.039-18.419 13.475-28.217 36.704-23.872 60.29l-47.318-17.222c-23.28-8.475-49.119 3.573-57.594 26.856l-20.49 56.297c-2.829 7.773 1.179 16.369 8.953 19.197l234.084 85.199H50.743c-8.272 0-14.978 6.706-14.978 14.978v209.688c0 24.776 20.157 44.933 44.933 44.933h299.555c24.776 0 44.933-20.157 44.933-44.933V296.42l11.587 4.218c7.737 2.818 16.355-1.147 19.197-8.952l20.491-56.297c8.472-23.283-3.575-49.118-26.858-57.592zM185.541 482.045H80.697c-8.259 0-14.978-6.719-14.978-14.978v-194.71h119.822v209.688zm59.911 0h-29.955V272.357h29.955v209.688zm94.881-392.47c17.375-15.361 44.805-6.744 50.331 15.731 5.893 23.963-17.269 44.741-40.451 36.317l-48.703-17.727 38.823-34.321zM200.695 35.962c18.72-13.694 45.237-2.582 48.668 20.303l7.68 51.445-48.699-17.725c-23.184-8.443-27.563-39.457-7.649-54.023zm7.056 149.44L67.007 134.175l15.368-42.222c2.825-7.761 11.438-11.775 19.198-8.952l126.668 46.103-20.49 56.298zm56.298 20.492L235.9 195.648l20.491-56.297 28.149 10.246-20.491 56.297zm131.18 261.173c0 8.259-6.719 14.978-14.978 14.978H275.408V272.357h83.666l36.156 13.16v181.55zm53.08-241.925-15.367 42.223-140.744-51.227 20.491-56.297 126.669 46.103c7.761 2.825 11.776 11.438 8.951 19.198z" />
      </svg>
    ),
  },
  {
    name: "Pet",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-cyan-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -32 512 512">
        <path d="M342.383 239.352c-23.04-35.942-62.278-57.403-104.965-57.403-42.684 0-81.926 21.461-104.961 57.403l-55.516 86.605c-9.21 14.371-13.46 30.969-12.293 47.996 1.168 17.031 7.649 32.89 18.739 45.871 11.097 12.977 25.761 21.844 42.406 25.649 16.644 3.8 33.707 2.18 49.34-4.692l1.02-.453c39.34-16.957 84.304-16.805 123.546.453 10.121 4.45 20.844 6.7 31.664 6.7 5.883 0 11.801-.668 17.664-2.004 16.645-3.801 31.309-12.668 42.41-25.645 11.094-12.977 17.579-28.84 18.75-45.871 1.172-17.035-3.078-33.633-12.289-48.008zm26.246 160.972c-14.121 16.508-36.965 21.727-56.848 12.985-23.633-10.395-49-15.59-74.375-15.59-25.351 0-50.715 5.191-74.332 15.574l-.672.297c-19.73 8.344-42.238 3.058-56.203-13.266-14.105-16.512-15.71-39.887-3.992-58.172l55.52-86.605c17.492-27.29 47.28-43.582 79.691-43.582 32.41 0 62.203 16.293 79.7 43.582l55.51 86.601c11.724 18.293 10.114 41.672-4 58.176zM91.895 239.238c16.515-6.343 29.062-19.652 35.332-37.476 5.96-16.961 5.472-36.11-1.383-53.922-6.86-17.8-19.336-32.332-35.13-40.922-16.597-9.02-34.827-10.488-51.316-4.133-33.171 12.754-48.394 53.746-33.93 91.399 11.555 29.968 38.505 48.886 65.75 48.886a57.316 57.316 0 0 0 20.677-3.832zm-58.418-55.836c-8.524-22.187-1.036-45.789 16.703-52.609a27.844 27.844 0 0 1 10.047-1.848c5.336 0 10.847 1.457 16.152 4.344 9.539 5.184 17.16 14.184 21.457 25.336 4.293 11.16 4.676 22.941 1.074 33.18-3.3 9.382-9.617 16.28-17.781 19.418l-.016.007c-17.715 6.829-39.086-5.66-47.636-27.828zM199.613 171.387c41.469 0 75.207-38.438 75.207-85.684C274.82 38.445 241.082 0 199.613 0c-41.465 0-75.199 38.445-75.199 85.703 0 47.246 33.734 85.684 75.2 85.684zm0-141.375c24.918 0 45.196 24.984 45.196 55.691 0 30.695-20.278 55.672-45.196 55.672s-45.187-24.977-45.187-55.672c0-30.707 20.27-55.691 45.187-55.691zM329.496 192.438h.004a61.3 61.3 0 0 0 19.367 3.128c30.242 0 59.715-22.011 70.961-55.84 6.477-19.472 6.05-40.062-1.2-57.972-7.585-18.746-21.644-32.356-39.589-38.324-17.945-5.961-37.363-3.477-54.664 7-16.527 10.011-29.191 26.246-35.656 45.718-13.653 41.079 4.64 84.274 40.777 96.29zM317.2 105.612c4.223-12.715 12.293-23.191 22.727-29.511 9.652-5.848 20.183-7.336 29.648-4.192 9.461 3.149 17 10.64 21.235 21.102 4.574 11.304 4.77 24.531.539 37.246-8.434 25.375-31.934 40.492-52.383 33.699-20.434-6.797-30.2-32.969-21.766-58.344zM487.875 182.438l-.012-.012c-28.597-21.125-71.367-11.969-95.347 20.422-23.957 32.406-20.211 75.972 8.343 97.113 10.414 7.715 22.72 11.402 35.313 11.402 21.95 0 44.785-11.203 60.047-31.804 23.957-32.407 20.215-75.973-8.344-97.122zm-15.777 79.265c-14.16 19.113-38.102 25.453-53.38 14.137-15.265-11.3-16.195-36.043-2.073-55.145 9.386-12.68 23.097-19.734 35.734-19.734 6.39 0 12.508 1.805 17.648 5.605 15.254 11.313 16.18 36.047 2.07 55.137zm0 0" />
      </svg>
    ),
  },
  {
    name: "Insurance",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-sky-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-76 -21 682 682.667">
        <path d="m262.059 640-9.93-4.512c-87.656-39.843-162.832-98.926-223.426-175.62-20.66-26.141-32.035-59.016-32.035-92.571V0l34.797 14.93c42.422 18.203 76.77 26.68 108.078 26.68 54.812 0 109.18-33.329 109.723-33.665l12.793-7.93 13.02 7.587c.534.308 56.929 32.78 111.534 32.78 39.461 0 77.285-13.655 105.828-25.554L527 .43v370.394c0 31.672-9.781 61.957-28.281 87.606-56.504 78.285-132.746 137.957-226.602 177.347zM46.579 74.355v292.942c0 22.371 7.558 44.258 21.288 61.629 53.317 67.476 118.88 120.078 194.992 156.488 80.657-35.75 146.352-88.262 195.383-156.2 12.324-17.081 18.844-37.277 18.844-58.39V74.027c-26.707 8.977-57.563 16.266-90.473 16.266-51.242 0-100.941-21.348-123.8-32.73-22.508 11.859-71.407 33.96-123.27 33.96-33.89.004-66.129-7.949-92.965-17.168zm370.16 155.856-35.294-35.293-146.75 146.758-81.246-81.246-35.297 35.293 116.543 116.539zm0 0" />
      </svg>
    ),
  },
  {
    name: "Children",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-blue-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M56.7 28.2c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.4-10 10zM75 41.8H63.5c-3.8 0-6.9 3.1-6.9 6.9v29.8c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3v-6.7c0-1.8 1.5-3.3 3.3-3.3 1.8 0 3.3 1.5 3.3 3.3v6.7c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3V53c0-.6.8-.9 1.2-.5l5.1 5.1c1.3 1.3 3.4 1.3 4.7 0 1.3-1.3 1.3-3.4 0-4.7L77.9 43c-.8-.7-1.8-1.2-2.9-1.2zM12.4 57.5c1.3 1.3 3.4 1.3 4.7 0l2.1-2.1c.4-.4 1.1 0 1 .5l-3.3 14.8c-.1.6.3 1.1.9 1.1h4c.9 0 1.6.7 1.6 1.6v5.1c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3v-3.3c0-1.8 1.5-3.3 3.3-3.3 1.8 0 3.3 1.5 3.3 3.3v3.3c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3v-5.1c0-.9.7-1.6 1.6-1.6h4c.6 0 1-.5.9-1.1l-5.4-24.2c-.6-2.8-3.1-4.7-5.9-4.7h-9.6c-3.6 0-7 1.4-9.5 3.9l-7 7c-1.2 1.4-1.2 3.5.1 4.8zM23.3 28.2c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.4-10 10z" />
      </svg>
    ),
  },
  {
    name: "Debt",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-indigo-300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 3"
        viewBox="0 0 64 64"
      >
        <path d="M18 25v-.382l.624.312A11.357 11.357 0 0 0 29.378 40h1.244a11.362 11.362 0 0 0 8.256-19.185A2.935 2.935 0 0 0 38.234 18a2.994 2.994 0 0 0 0-4A3 3 0 0 0 36 9a.964.964 0 0 0-.152.012l-1.374.211 1.5-5.98a1 1 0 0 0-1.525-1.075l-2.172 1.445-1.446-2.168a1 1 0 0 0-1.7.051L27.6 4.124 25.428 3.1a1 1 0 0 0-1.4 1.146l.572 2.281L18 9.461V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1H1v2h7v12H1v2h7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1Zm22 3.622A9.389 9.389 0 0 1 30.622 38h-1.244a9.365 9.365 0 0 1-8.949-12.167l2.124 1.067A1 1 0 0 0 23 27h4a3 3 0 0 0 3 3 1 1 0 1 1-1 1h-2a3 3 0 0 0 2 2.816V36h2v-2.184A2.993 2.993 0 0 0 30 28a1 1 0 0 1-1-1h5a3 3 0 0 0 2.789-4.1 2.994 2.994 0 0 0 .909-.426A9.413 9.413 0 0 1 40 28.622ZM27.572 6.324a1 1 0 0 0 1.291-.4l1.192-2.039 1.113 1.669a1 1 0 0 0 1.387.277l.847-.565-1.071 4.287-4.732.728-1.117-4.473ZM18 11.65l7.093-3.15.522 2.089-2.767.426.3 1.976L36.063 11A1 1 0 0 1 36 13h-3v2h3a1 1 0 0 1 0 2h-3v2h3a1 1 0 0 1 0 2h-3v2h1a1 1 0 0 1 0 2H23.236L18 22.382ZM16 24h-6V10h6ZM63 48v-2h-5a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v1.6a9.313 9.313 0 0 0-6.471-2.6h-1.293a4.587 4.587 0 0 0-3.8 2H30a2.992 2.992 0 0 0-2.528 1.4l-4.951-4.18A3.752 3.752 0 0 0 16 46.751v.193a3.749 3.749 0 0 0 .963 2.51l6.287 6.985A7.713 7.713 0 0 0 28.945 59L48 59.951V62a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1h5v-2h-5V48Zm-15 9.949L29 57a5.745 5.745 0 0 1-4.264-1.9l-6.286-6.984a1.752 1.752 0 0 1-.45-1.172v-.193a1.751 1.751 0 0 1 3.069-1.151 1.091 1.091 0 0 0 .109.106l5.911 4.988A3 3 0 0 0 30 53h7v-2h-7a1 1 0 0 1 0-2h7a1 1 0 0 0 .9-.553A2.6 2.6 0 0 1 40.236 47h1.293a7.323 7.323 0 0 1 5.207 2.149A22.034 22.034 0 0 1 48 51.256ZM56 61h-6V47h6Z" />
      </svg>
    ),
  },
  {
    name: "Utility",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-violet-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <path
          fill="transparent"
          d="M91.143 79.301c0 16.085-13.039 29.124-29.124 29.124s-29.124-13.04-29.124-29.124c0-13.719 21.187-49.522 27.419-59.757a1.993 1.993 0 0 1 3.409 0c6.233 10.235 27.42 46.038 27.42 59.757z"
          data-original="#72c2e9"
        />
        <path
          fill="transparent"
          d="M91.972 210.776c0 16.558-13.411 29.969-29.953 29.969s-29.953-13.411-29.953-29.969c0-5.762 3.633-15.333 8.382-25.342.67-1.413 2.635-1.54 3.486-.228l9.023 13.922 7.688-44.73c.472-2.747 4.107-3.421 5.535-1.026 8.239 13.819 25.792 44.745 25.792 57.404z"
          data-original="#fc5d3d"
        />
        <path
          fill="transparent"
          d="M217.926 54.173h-17.289l4.434-36.523a2 2 0 0 0-1.985-2.241h-30.191a2 2 0 0 0-1.985 1.759l-6.437 53.02a2 2 0 0 0 1.985 2.241h11.867a2 2 0 0 1 1.985 2.241l-4.398 36.247c-.248 2.047 2.389 3.085 3.602 1.418l40.028-54.984c.963-1.323.019-3.178-1.616-3.178z"
          data-original="#f0c020"
        />
        <path
          fill="transparent"
          d="M208.044 228.695c-4.01-4.011-9.343-6.22-15.016-6.22s-11.006 2.209-15.016 6.22a5.565 5.565 0 0 1-7.87-7.868c6.113-6.114 14.241-9.48 22.886-9.48s16.773 3.367 22.886 9.48a5.565 5.565 0 0 1-7.87 7.868z"
          data-original="#fc5d3d"
        />
        <path
          fill="transparent"
          d="M221.465 207.67c-15.681-15.679-41.195-15.679-56.876 0a5.563 5.563 0 1 1-7.868-7.868c20.019-20.019 52.592-20.019 72.611 0a5.563 5.563 0 0 1 0 7.868 5.56 5.56 0 0 1-7.867 0z"
          data-original="#f0c020"
        />
        <path
          fill="transparent"
          d="M233.853 184.897c-22.512-22.51-59.138-22.51-81.651 0a5.563 5.563 0 1 1-7.868-7.868c26.848-26.85 70.538-26.85 97.386 0a5.563 5.563 0 1 1-7.867 7.868z"
          data-original="#72c2e9"
        />
        <path
          d="M62.019 98.713a2.5 2.5 0 1 1 0-5c7.947 0 14.412-6.465 14.412-14.412.001-2.81-2.994-11.559-11.4-27.688a2.498 2.498 0 0 1 1.062-3.372 2.499 2.499 0 0 1 3.372 1.062c5.46 10.475 11.968 24.183 11.967 29.999-.001 10.703-8.709 19.411-19.413 19.411zm.487-54.564a2.499 2.499 0 0 1-2.192-1.295l-.479-.863a2.499 2.499 0 1 1 4.365-2.437l.495.891a2.5 2.5 0 0 1-2.189 3.704z"
          data-original="#c5e5fe"
        />
        <path
          d="M179.716 61.184a2.499 2.499 0 0 1-2.485-2.801l.361-2.979a2.5 2.5 0 0 1 4.963.601l-.361 2.979a2.5 2.5 0 0 1-2.478 2.2zm1.567-12.906a2.5 2.5 0 0 1-2.485-2.802l2.019-16.625a2.494 2.494 0 0 1 2.783-2.18 2.5 2.5 0 0 1 2.18 2.783l-2.019 16.625a2.499 2.499 0 0 1-2.478 2.199z"
          data-original="#f8e5b0"
        />
        <path
          d="M62.029 230.684c-.497 0-.997-.018-1.5-.056a2.502 2.502 0 0 1-2.306-2.681c.104-1.378 1.322-2.418 2.681-2.306 8.708.658 16.006-6.272 16.006-14.865 0-1.186-.574-5.186-5.895-16.691a2.5 2.5 0 1 1 4.539-2.097c4.217 9.121 6.355 15.442 6.355 18.789.001 10.976-8.918 19.907-19.88 19.907zm6.876-44.138a2.502 2.502 0 0 1-2.228-1.362l-.455-.891a2.5 2.5 0 1 1 4.451-2.277l.455.891a2.499 2.499 0 0 1-2.223 3.639z"
          data-original="#ffcbc3"
        />
        <path
          d="M33.22 84.319c-1.132.173-2.58-.756-2.71-2.27a2.501 2.501 0 0 1 2.28-2.71c1.34-.11 2.58.91 2.7 2.26v.021c.119 1.37-.9 2.58-2.27 2.699z"
          data-original="#000000"
        />
        <path
          d="M33.27 92.49a2.489 2.489 0 0 1 1.23-3.311c1.22-.56 2.76.01 3.31 1.22 4.34 9.431 13.84 15.521 24.2 15.521 14.66-.021 26.61-11.97 26.63-26.62.094-12.452-20.179-47.119-26.62-57.75-3.55 5.83-20.84 34.73-25.46 51.09-.37 1.29-1.79 2.09-3.09 1.72a2.514 2.514 0 0 1-1.72-3.09c4.46-15.57 18.47-39.9 26.43-53.03 1.707-2.839 5.901-2.922 7.68 0 7.494 12.335 27.703 46.735 27.78 61.06 0 17.475-14.134 31.62-31.62 31.62a31.583 31.583 0 0 1-28.75-18.43z"
          data-original="#000000"
        />
        <path
          d="M255.375 128a2.5 2.5 0 0 1-2.5 2.5H130.5v122.375a2.5 2.5 0 1 1-5 0V130.5H3.125a2.5 2.5 0 1 1 0-5H125.5V3.125a2.5 2.5 0 1 1 5 0V125.5h122.375a2.5 2.5 0 0 1 2.5 2.5z"
          data-original="#000000"
        />
        <path
          d="m173.431 110.614 4.329-35.687h-11.303a4.501 4.501 0 0 1-4.467-5.041l6.437-53.021a4.503 4.503 0 0 1 4.467-3.958h30.191a4.502 4.502 0 0 1 4.467 5.042l-4.093 33.723h14.467c3.675 0 5.802 4.175 3.639 7.148l-40.028 54.984c-2.732 3.75-8.668 1.416-8.106-3.19zm4.893-40.686a4.502 4.502 0 0 1 4.467 5.042l-4.165 34.338 38.317-52.635h-16.307a2.5 2.5 0 0 1-2.481-2.801l4.365-35.964h-29.184l-6.315 52.02zm27.952 160.535c-7.321-7.321-19.175-7.326-26.496 0-3.144 3.142-8.259 3.144-11.404.002-3.146-3.146-3.146-8.262-.002-11.405 13.623-13.627 35.682-13.629 49.307 0 3.145 3.144 3.144 8.26-.001 11.404-3.141 3.142-8.258 3.144-11.404-.001zm3.536-3.535a3.068 3.068 0 0 0 4.333.001 3.069 3.069 0 0 0 .001-4.334c-11.67-11.672-30.564-11.675-42.236 0a3.069 3.069 0 0 0 .001 4.334 3.072 3.072 0 0 0 4.334-.002c9.274-9.278 24.291-9.277 33.567.001z"
          data-original="#000000"
        />
        <path
          d="M219.698 209.438c-14.707-14.702-38.636-14.704-53.341 0a8.006 8.006 0 0 1-5.702 2.362c1 0-2.871.473-5.702-2.363a8.056 8.056 0 0 1 .001-11.402c20.995-20.991 55.153-20.992 76.146.001a8.056 8.056 0 0 1-.001 11.403 8.057 8.057 0 0 1-11.401-.001zm3.536-3.535c1.156 1.156 3.174 1.156 4.33 0a3.06 3.06 0 0 0 .002-4.332c-19.045-19.045-50.032-19.044-69.077-.001a3.06 3.06 0 0 0 0 4.331 3.06 3.06 0 0 0 4.332.002c16.656-16.653 43.756-16.655 60.413 0zm-15.005-44.763a2.499 2.499 0 0 1-1.859-3c.31-1.32 1.66-2.18 3-1.87a2.51 2.51 0 0 1 1.87 3.011c-.336 1.405-1.754 2.187-3.011 1.859z"
          data-original="#000000"
        />
        <path
          d="M146.102 178.798a3.059 3.059 0 0 0 0 4.33c1.158 1.16 3.176 1.158 4.332.002 23.486-23.484 61.702-23.485 85.187-.001 1.158 1.158 3.176 1.157 4.332.001a3.056 3.056 0 0 0 .012-4.318c-.004-.004-.01-.007-.014-.012-6.48-6.48-14.051-11.46-22.521-14.79a2.5 2.5 0 0 1-1.42-3.24c.481-1.227 1.85-1.931 3.25-1.42 9.11 3.59 17.26 8.94 24.23 15.91.01.01.017.022.027.033a8.056 8.056 0 0 1-.029 11.373 8.057 8.057 0 0 1-11.404-.002c-21.536-21.531-56.578-21.53-78.114.001a8.055 8.055 0 0 1-11.404-.001 8.05 8.05 0 0 1-.069-11.325c.023-.025.039-.054.063-.079 14.732-14.732 35.174-22.394 56.59-20.61a2.511 2.511 0 0 1 2.28 2.7c-.12 1.36-1.35 2.38-2.71 2.28-19.487-1.66-38.59 5.14-52.61 19.16-.001 0-.003.005-.008.008zm-66.493-1.388c1.21-.61 2.75-.101 3.36 1.1.62 1.23.12 2.74-1.11 3.36a2.49 2.49 0 0 1-3.35-1.101c-.649-1.258-.104-2.756 1.1-3.359z"
          data-original="#000000"
        />
        <path
          d="M78.29 169.58c.66 1.21.2 2.729-1.01 3.39a2.505 2.505 0 0 1-3.391-1.01c-3.75-6.92-7.43-13.23-9.859-17.311l-.001-.003a.497.497 0 0 0-.919.176l-7.688 44.729c-.385 2.234-3.325 2.846-4.562.936l-8.536-13.169c-6.399 13.632-7.757 20.275-7.757 23.458 0 15.134 12.295 27.447 27.415 27.468.013 0 .025-.004.039-.004 15.11-.021 27.42-12.341 27.45-27.46.05-4.04-2.38-11.721-6.67-21.08a2.508 2.508 0 0 1 1.24-3.32c1.229-.55 2.76.03 3.31 1.25 3.29 7.3 7.061 16.53 7.12 23.15 0 18.029-14.582 32.47-32.45 32.47-.022 0-.042-.006-.064-.006-17.866-.034-32.389-14.585-32.389-32.467 0-5.467 2.901-14.354 8.623-26.414 1.5-3.164 5.922-3.479 7.842-.516l5.545 8.555 6.605-38.427c.871-5.063 7.576-6.243 10.148-1.885 2.449 4.12 6.169 10.49 9.959 17.49z"
          data-original="#000000"
        />
      </svg>
    ),
  },
  {
    name: "Retirement",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-purple-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path d="M60 43h-1.695C61.139 41.008 63 37.72 63 34c0-6.065-4.935-11-11-11s-11 4.935-11 11c0 3.72 1.861 7.008 4.695 9H44c-1.654 0-3 1.346-3 3v2c0 .475.121.919.319 1.319A2.96 2.96 0 0 0 40 49h-1.967l.946-28.545C40.18 19.764 41 18.483 41 17c0-2.206-1.794-4-4-4H22.889A6.973 6.973 0 0 0 25 8c0-3.859-3.141-7-7-7s-7 3.141-7 7a6.984 6.984 0 0 0 2.772 5.565c-2.238.729-4.193 2.14-5.524 4.097C6.093 20.832 5 24.311 5 28c0 4.664 4.422 7.665 6 8.588V53c0 .732.212 1.409.556 2H4c-1.654 0-3 1.346-3 3v2c0 1.654 1.346 3 3 3h16a2.98 2.98 0 0 0 2-.78c.532.48 1.229.78 2 .78h16a2.98 2.98 0 0 0 2-.78c.532.48 1.229.78 2 .78h16c1.654 0 3-1.346 3-3v-2a2.98 2.98 0 0 0-.78-2c.48-.532.78-1.229.78-2v-2a2.98 2.98 0 0 0-.78-2c.48-.532.78-1.229.78-2v-2c0-1.654-1.346-3-3-3zm-17-9c0-4.963 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9-9-4.037-9-9zm0 12a1 1 0 0 1 1-1h1v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H44a1 1 0 0 1-1-1zm18 6v2a1 1 0 0 1-1 1H44a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h1a1 1 0 0 1 1 1zm-20 0v2a1 1 0 0 1-1 1H24a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h1a1 1 0 0 1 1 1zm-22.556 3A3.959 3.959 0 0 0 19 53V35.28l4 3.2V47c0 .749.22 1.443.579 2.043A2.994 2.994 0 0 0 21 52v2c0 .475.121.919.319 1.319A2.96 2.96 0 0 0 20 55zM28.65 31.978 26 30.321V21h7.033l.933 28h-3.523A3.95 3.95 0 0 0 31 47V36.217a4.968 4.968 0 0 0-2.35-4.239zM35.967 49l-.933-28h1.928l-.928 28zM13 8c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5zm0 45V21h-2v13.199C9.386 33.05 7 30.871 7 28c0-3.281.977-6.381 2.902-9.213C11.515 16.416 14.258 15 17.239 15H37c1.103 0 2 .897 2 2s-.897 2-2 2H24v10.071l-1.47-.919-1.061 1.695 6.12 3.825a2.983 2.983 0 0 1 1.41 2.544V47c0 1.103-.897 2-2 2s-2-.897-2-2v-8.52a1.99 1.99 0 0 0-.75-1.562L19.351 33H17v20c0 1.103-.897 2-2 2s-2-.897-2-2zm7 8H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm20 0H24a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm21-1a1 1 0 0 1-1 1H44a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h1a1 1 0 0 1 1 1z" />
        <path d="M53 31a1 1 0 0 1 1 1h2c0-1.654-1.346-3-3-3v-2h-2v2h-3v3c0 1.654 1.346 3 3 3h2a1 1 0 0 1 1 1v1h-3a1 1 0 0 1-1-1h-2c0 1.654 1.346 3 3 3v2h2v-2h3v-3c0-1.654-1.346-3-3-3h-2a1 1 0 0 1-1-1v-1z" />
      </svg>
    ),
  },
  {
    name: "Tax",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-pink-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="m325.884 158.048-.434-.071c-5.452-.881-10.583 2.836-11.458 8.29-.873 5.452 2.838 10.582 8.291 11.457l.35.057c.551.091 1.098.135 1.638.135 4.807 0 9.047-3.477 9.854-8.375.898-5.449-2.792-10.595-8.241-11.493z" />
        <path d="M501.806 284.62c-11.645-11.644-30.59-11.644-42.234 0-3.905 3.905-3.905 10.237 0 14.143 3.905 3.905 10.237 3.905 14.143 0 3.846-3.847 10.104-3.846 13.95 0 5.783 5.782 5.783 15.19 0 20.973a20.896 20.896 0 0 1-14.876 6.162 20.896 20.896 0 0 1-14.895-6.18c.069-1.922.115-3.847.115-5.78 0-61.915-36.453-118.435-92.868-143.991-5.031-2.278-10.957-.048-13.235 4.982-2.279 5.031-.048 10.957 4.982 13.235 49.279 22.323 81.121 71.692 81.121 125.773 0 47.153-23.706 90.564-63.413 116.124a10.001 10.001 0 0 0-4.587 8.409V486c0 3.309-2.691 6-6 6h-48c-3.309 0-6-2.691-6-6v-19.698c0-7.921-6.444-14.365-14.364-14.365H192.373c-7.921 0-14.365 6.444-14.365 14.365V486c0 3.309-2.691 6-6 6h-48c-3.309 0-6-2.691-6-6v-47.53a10 10 0 0 0-4.587-8.408c-28.613-18.419-49.354-46.546-58.401-79.199a9.997 9.997 0 0 0-12.455-6.926h-9.588c-7.151 0-12.969-5.818-12.969-12.969v-34.063c0-7.151 5.818-12.969 12.969-12.969h9.715a9.993 9.993 0 0 0 12.327-6.96c15.55-56.08 64.983-96.542 123.009-100.685 5.509-.393 9.656-5.178 9.263-10.687-.393-5.509-5.184-9.646-10.687-9.263a156.966 156.966 0 0 0-27.917 4.562c-5.785-26.961-29.792-47.238-58.455-47.238h-3.803c-5.523 0-10 4.477-10 10v78.45C59.313 219.174 46 240.198 38.094 263.938h-5.117c-18.179 0-32.969 14.79-32.969 32.969v34.063c0 18.179 14.79 32.969 32.969 32.969h5.127c10.775 32.355 31.747 60.342 59.904 79.875V486c0 14.336 11.664 26 26 26h48c14.336 0 26-11.664 26-26v-14.063h92V486c0 14.336 11.664 26 26 26h48c14.336 0 26-11.664 26-26v-42.187c34.866-24.169 58.135-60.721 65.492-101.717a40.902 40.902 0 0 0 17.288 3.801c10.962 0 21.267-4.269 29.019-12.02 13.58-13.58 13.58-35.676-.001-49.257zM96.429 134.148c16.957 2.664 30.385 16.078 33.088 33.021a158.216 158.216 0 0 0-33.088 18.049v-51.07z" />
        <path d="M120.298 249.06a10.033 10.033 0 0 0-7.07-2.93c-2.64 0-5.21 1.06-7.07 2.93a10.058 10.058 0 0 0-2.93 7.07c0 2.63 1.07 5.21 2.93 7.07 1.86 1.86 4.44 2.93 7.07 2.93s5.21-1.07 7.07-2.93c1.86-1.87 2.93-4.44 2.93-7.07s-1.07-5.21-2.93-7.07zM304.288 213h-113.56c-5.523 0-10 4.477-10 10s4.477 10 10 10h113.56c5.523 0 10-4.477 10-10s-4.477-10-10-10zM247.508 86.593c-29.224 0-53 23.776-53 53s23.776 53 53 53 53-23.776 53-53-23.776-53-53-53zm0 86c-18.196 0-33-14.804-33-33 0-18.196 14.804-33 33-33s33 14.804 33 33c0 18.196-14.804 33-33 33zM247.491 0c-5.523 0-10 4.477-10 10v43.139c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10zM337.694 38.679c-3.905-3.905-10.237-3.905-14.143 0l-26.335 26.335c-3.905 3.905-3.905 10.237 0 14.143a9.97 9.97 0 0 0 7.072 2.929 9.966 9.966 0 0 0 7.071-2.929l26.335-26.335c3.905-3.905 3.905-10.237 0-14.143zM197.799 64.963l-26.335-26.335c-3.905-3.905-10.237-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.143l26.336 26.335a9.968 9.968 0 0 0 7.071 2.929 9.966 9.966 0 0 0 7.071-2.929c3.905-3.905 3.905-10.237 0-14.143zM173.781 307.726h-34.796c-5.523 0-10 4.477-10 10s4.477 10 10 10h7.398v53.955c0 5.523 4.477 10 10 10s10-4.477 10-10v-53.955h7.398c5.523 0 10-4.477 10-10s-4.477-10-10-10zM267.981 377.84l-26.45-63.475a9.998 9.998 0 0 0-18.46 0l-26.45 63.475c-2.124 5.098.287 10.953 5.385 13.077 5.097 2.126 10.953-.286 13.077-5.384l1.53-3.672h31.376l1.53 3.672a10.001 10.001 0 0 0 9.235 6.156 9.965 9.965 0 0 0 3.842-.772c5.098-2.124 7.509-7.979 5.385-13.077zm-43.034-15.98 7.354-17.65 7.354 17.65h-14.708zM335.119 349.717l17.264-26.548c3.011-4.63 1.698-10.824-2.932-13.835-4.631-3.012-10.825-1.698-13.835 2.932l-12.426 19.108-12.426-19.108c-3.011-4.63-9.205-5.943-13.835-2.932s-5.942 9.205-2.932 13.835l17.264 26.548-17.264 26.548c-3.011 4.63-1.698 10.824 2.932 13.835a9.953 9.953 0 0 0 5.442 1.618 9.993 9.993 0 0 0 8.393-4.549l12.426-19.108 12.426 19.108a9.992 9.992 0 0 0 8.393 4.549 9.948 9.948 0 0 0 5.442-1.618c4.63-3.011 5.942-9.205 2.932-13.835l-17.264-26.548z" />
      </svg>
    ),
  },
  {
    name: "Other",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-fuchsia-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <g data-name="Layer 52">
          <path d="M47.58 26.83A5.17 5.17 0 1 0 52.75 32a5.18 5.18 0 0 0-5.17-5.17Zm0 8.84A3.67 3.67 0 1 1 51.25 32a3.67 3.67 0 0 1-3.67 3.67ZM32 26.83A5.17 5.17 0 1 0 37.17 32 5.18 5.18 0 0 0 32 26.83Zm0 8.84A3.67 3.67 0 1 1 35.67 32 3.67 3.67 0 0 1 32 35.67ZM16.42 26.83A5.17 5.17 0 1 0 21.6 32a5.18 5.18 0 0 0-5.18-5.17Zm0 8.84A3.67 3.67 0 1 1 20.1 32a3.67 3.67 0 0 1-3.68 3.67Z" />
          <path d="M48 60.75H16A12.76 12.76 0 0 1 3.25 48V16A12.76 12.76 0 0 1 16 3.25h32A12.76 12.76 0 0 1 60.75 16v32A12.76 12.76 0 0 1 48 60.75Zm-32-56A11.27 11.27 0 0 0 4.75 16v32A11.27 11.27 0 0 0 16 59.25h32A11.27 11.27 0 0 0 59.25 48V16A11.27 11.27 0 0 0 48 4.75Z" />
        </g>
      </svg>
    ),
  },
  {
    name: "Custom",
    foregroundColor: "text-slate-900",
    backgroundColor: "bg-rose-300",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill="#f77953"
          d="M504.094 235.067v41.789a9.688 9.688 0 0 1-7.346 9.401l-30.726 7.654c-3.576.891-6.26 3.759-7.059 7.356a206.976 206.976 0 0 1-27.379 66.191c-1.973 3.105-2.097 7.016-.206 10.172l16.296 27.196a9.69 9.69 0 0 1-1.453 11.824l-29.524 29.58a9.688 9.688 0 0 1-11.849 1.459l-27.174-16.337c-3.158-1.899-7.076-1.777-10.186.199a206.563 206.563 0 0 1-66.112 27.374c-3.593.798-6.459 3.477-7.353 7.047l-7.72 30.825a9.689 9.689 0 0 1-9.398 7.335h-41.807a9.689 9.689 0 0 1-9.398-7.335l-7.72-30.825c-.894-3.57-3.761-6.249-7.354-7.047a205.72 205.72 0 0 1-66.038-27.366c-3.109-1.981-7.028-2.107-10.189-.211l-27.248 16.349a9.689 9.689 0 0 1-11.842-1.463L65.78 416.65a9.687 9.687 0 0 1-1.453-11.824l16.135-26.927c1.974-3.294 1.732-7.38-.436-10.55-13.106-19.167-21.818-42.193-26.993-66.032-.788-3.63-3.506-6.522-7.11-7.42l-30.67-7.64a9.687 9.687 0 0 1-7.346-9.401v-41.789a9.688 9.688 0 0 1 7.346-9.401l30.693-7.646c3.592-.895 6.288-3.781 7.084-7.397 5.247-23.837 14.661-46.141 27.371-66.136 1.981-3.116 2.104-7.047.203-10.213l-16.269-27.097a9.688 9.688 0 0 1 1.449-11.831l29.52-29.576a9.688 9.688 0 0 1 11.849-1.459l27.156 16.326c3.168 1.904 7.097 1.775 10.211-.217 19.949-12.763 42.264-22.13 66.171-27.423 3.599-.797 6.471-3.483 7.362-7.06l7.654-30.723a9.687 9.687 0 0 1 9.401-7.346h41.788a9.688 9.688 0 0 1 9.401 7.346l7.646 30.694c.895 3.592 3.781 6.288 7.397 7.084 23.839 5.248 46.145 14.663 66.142 27.375 3.114 1.979 7.041 2.104 10.206.207l27.166-16.278a9.689 9.689 0 0 1 11.837 1.466l29.527 29.583a9.688 9.688 0 0 1 1.449 11.831l-16.269 27.097c-1.901 3.166-1.778 7.097.203 10.213 12.71 19.995 22.124 42.299 27.371 66.136.796 3.615 3.492 6.502 7.084 7.397l30.693 7.646a9.69 9.69 0 0 1 7.345 9.402z"
        />
        <path
          fill="#fff"
          d="M410.351 255.957c0 85.251-69.127 154.379-154.322 154.379-85.252 0-154.379-69.128-154.379-154.379 0-85.252 69.127-154.322 154.379-154.322 85.194 0 154.322 69.07 154.322 154.322z"
        />
        <path
          fill="#84405f"
          d="M186.371 357.788a5.278 5.278 0 0 1-5.279-5.279v-48.033c0-2.916 2.361-5.279 5.279-5.279s5.279 2.364 5.279 5.279v48.033a5.276 5.276 0 0 1-5.279 5.279zM186.371 253.37a5.278 5.278 0 0 1-5.279-5.279v-88.598c0-2.916 2.361-5.279 5.279-5.279s5.279 2.364 5.279 5.279v88.598a5.276 5.276 0 0 1-5.279 5.279zM255.999 212.803a5.278 5.278 0 0 1-5.279-5.279v-48.03c0-2.916 2.361-5.279 5.279-5.279s5.279 2.364 5.279 5.279v48.03a5.278 5.278 0 0 1-5.279 5.279zM255.999 357.788a5.278 5.278 0 0 1-5.279-5.279v-88.6c0-2.916 2.361-5.279 5.279-5.279s5.279 2.364 5.279 5.279v88.6a5.278 5.278 0 0 1-5.279 5.279zM325.632 357.788a5.278 5.278 0 0 1-5.279-5.279V297.65c0-2.916 2.361-5.279 5.279-5.279s5.279 2.364 5.279 5.279v54.859a5.278 5.278 0 0 1-5.279 5.279zM325.632 246.544a5.278 5.278 0 0 1-5.279-5.279v-81.772c0-2.916 2.361-5.279 5.279-5.279s5.279 2.364 5.279 5.279v81.772a5.278 5.278 0 0 1-5.279 5.279z"
        />
        <path
          d="M373.118 155.53c-26.978-23.23-62.086-37.22-100.414-37.22-85.21 0-154.371 69.107-154.371 154.317 0 38.487 14.096 73.648 37.431 100.678-33.102-28.298-54.114-70.374-54.114-117.361 0-85.263 69.108-154.318 154.37-154.318 46.881.001 88.853 20.908 117.098 53.904z"
          opacity=".1"
        />
        <circle cx="186.37" cy="276.284" r="28.192" fill="#f77953" />
        <circle cx="256" cy="235.716" r="28.192" fill="#4f8aff" />
        <circle cx="325.63" cy="269.457" r="28.192" fill="#543843" />
      </svg>
    ),
  },
];
const CategoriesDialog = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Categories
                </Dialog.Title>
                <div className="mt-2">
                  <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                  >
                    {categories.map((category) => (
                      <button key={category.name} className="group"
                      >
                        <li
                          className="col-span-1 flex rounded-md shadow-sm"
                        >
                          <div
                            className={classNames(
                              category.backgroundColor,
                              category.foregroundColor,
                              "flex w-12 h-12 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium p-1 group-hover:cursor-pointer"
                            )}
                          >
                            {category.icon}
                          </div>
                          <div className="flex flex-1 w-full items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-slate-50 group-hover:bg-slate-100 transition-colors">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                              <span className="font-medium text-gray-900 group-hover:text-slate-600 group-hover:underline transition">
                                {category.name}
                              </span>
                            </div>
                          </div>
                        </li>
                      </button>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={close}
                  >
                    Make your own
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Wallet;
