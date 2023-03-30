import { Switch } from "@headlessui/react";
import { classNames } from "@/app/utils";
import React from "react";

const Switcher = ({
  isIncome,
  setIsIncome,
}: {
  isIncome: boolean;
  setIsIncome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Switch.Group>
      <Switch
        checked={isIncome}
        onChange={setIsIncome}
        className="relative inline-flex h-[40px] w-4/5 shrink-0 bg-white cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            isIncome ? "translate-x-full" : "translate-x-0",
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
  );
};
export default Switcher;
