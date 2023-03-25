"use client";
import { WalletStats } from "@/app/types";
import React, { Fragment } from "react";
import { Listbox, Switch, Transition } from "@headlessui/react";
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
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                        <span
                          className="text-white sm:text-xl"
                          id="price-currency"
                        >
                          JMD
                        </span>
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
    </main>
  );
};
export default Wallet;
