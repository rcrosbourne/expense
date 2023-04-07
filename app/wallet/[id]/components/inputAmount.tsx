import { NumericFormat } from "react-number-format";
import React from "react";
import { Category } from "@/app/types/category";
import {Squares} from "@/app/components/icons";

const InputAmount = ({
  onChange,
  inputRef,
  isIncome,
  value,
  openCategories,
  category,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  inputRef: ((el: HTMLInputElement) => void) | React.Ref<any> | undefined;
  isIncome: boolean;
  value: string;
  openCategories: () => void;
  category: Category | undefined;
}) => {
  return (
    <>
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
                isIncome ? " + " : " - "
              }`}</span>
              <span className="text-white text-xl">$</span>
            </div>
          </div>
          <NumericFormat
            displayType="input"
            type="text"
            name="amount"
            id="amount"
            className="peer block w-full border-0 pl-12 bg-transparent text-white placeholder-white placeholder:text-2xl py-1.5 focus:ring-0 sm:text-2xl sm:leading-6"
            placeholder="0.00"
            thousandSeparator=","
            allowNegative={false}
            maxLength={18}
            decimalScale={2}
            fixedDecimalScale
            onChange={onChange}
            value={value}
            getInputRef={inputRef}
            autoComplete="off"
          />
          <div className="absolute inset-x-0 bottom-0 border-t border-gray-200 peer-focus:border-t-2 peer-focus:border-white" />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <div className="flex items-center gap-2">
              <span className="text-white sm:text-xl w-2">{`${
                isIncome ? " + " : " - "
              }`}</span>
              <span className="text-white text-xl">$</span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              onClick={openCategories}
              className="flex items-center justify-center rounded p-2 text-white hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
            >
              <div className="relative flex h-5 w-5 fill-current">
                <div className="absolute inline-flex h-full w-full animate-ping opacity-75 text-white">
                  {category && category.icon ? (
                    category.icon
                  ) : (
                      <Squares />
                  )}
                </div>
                <div className="relative inline-flex h-5 w-5 text-white">
                  {category && category.icon ? (
                    category.icon
                  ) : (
                        <Squares />
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default InputAmount;
