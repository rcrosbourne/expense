"use client";
import { WalletStats } from "@/app/types";
import React from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "@/app/utils";
import { NumericFormat } from "react-number-format";
const stat: WalletStats = {
  total: "$100,000.00",
  lastThirtyDays: "$300,000.00",
  lastSevenDays: "$75,000.00",
};
const Wallet = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const ref = React.useRef();
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Remove the separator and convert to number
    let inputElement = e.currentTarget as HTMLInputElement;
    let value = inputElement.value.replace(",", "");
    if(value !== amount) {
      setAmount(value);
      console.log(value)
    }
  }
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
            <section aria-labelledby="announcements-title">
              <div
                className={classNames(
                  enabled ? "bg-teal-700" : "bg-red-400",
                  "overflow-hidden rounded-lg  shadow transition-colors duration-1000 ease-in-out"
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
                          enabled ? "translate-x-[128px]" : "translate-x-0",
                          "pointer-events-none inline-block h-[34px] w-[150px] transform rounded-full bg-gray-300 shadow-lg ring-0 transition duration-700 ease-in-out"
                        )}
                      />
                      <Switch.Label className="absolute inset-y-0 left-0 top-1.5 text-sm pl-12">
                        Expense
                      </Switch.Label>
                      <Switch.Label className="absolute inset-y-0 right-0 top-1.5 text-sm pr-12">
                        Income
                      </Switch.Label>
                    </Switch>
                  </Switch.Group>
                </div>
                <div className="mt-3 px-4">
                  <form action="">
                    <div className="flex flex-col">
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
                          value={123123}
                          decimalScale={2}
                          fixedDecimalScale
                          onChange={onChange}
                           getInputRef={ref}
                        />
                        <div
                          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-white"
                          aria-hidden="true"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span
                            className="text-white sm:text-xl"
                            id="price-currency"
                          >
                            JMD
                          </span>
                        </div>
                      </div>
                      <div>
                        <input type="date"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>{" "}
        </div>
      </div>
    </main>
  );
};
export default Wallet;
