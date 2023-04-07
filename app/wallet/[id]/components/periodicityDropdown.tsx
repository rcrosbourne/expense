import React, {Fragment} from "react";
import { Listbox, Transition } from "@headlessui/react";
import { recurringPeriodicity } from "@/app/data/recurringPeriodicity";
import { classNames } from "@/app/utils";
import {Periodicity} from "@/app/types";
import {RecurringIcon, TickIcon} from "@/app/components/icons";

const PeriodicityDropdown = ({
  value,
  onChange,
}: {
  value: Periodicity;
  onChange: (value: Periodicity) => void;
}) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm sr-only font-medium leading-6 text-gray-900">
            Recurring
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-100 py-2.5 pl-3 pr-10 text-left text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <RecurringIcon className="h-6 w-6 text-slate-400 fill-current"/>
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
                {recurringPeriodicity.map((period) => (
                  <Listbox.Option
                    key={period}
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
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {period}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-slate-100" : "text-slate-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <TickIcon className="h-5 w-5" />
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
  );
};
export default PeriodicityDropdown;
