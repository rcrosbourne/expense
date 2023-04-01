import { NumericFormat } from "react-number-format";
import React from "react";

const InputAmount = ({
  onChange,
  inputRef,
  isIncome,
    value,
  openCategories,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  inputRef: ((el: HTMLInputElement) => void) | React.Ref<any> | undefined;
  isIncome: boolean;
  value: string;
  openCategories: () => void;
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
          <div className="absolute inset-x-0 bottom-0 border-t border-gray-200 peer-focus:border-t-2 peer-focus:border-white"/>
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
    </>
  );
};
export default InputAmount;
