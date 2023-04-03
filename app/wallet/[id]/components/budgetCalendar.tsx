import React, { Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { classNames, formatNumberAsCurrency } from "@/app/utils";
import dayjs from "dayjs";
import { FinancialTransaction } from "@/app/types/financialTransaction";
import * as Popover from "@radix-ui/react-popover";
type CalendarDay = {
  date: string;
  transactions: FinancialTransaction[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};
type Calendar = {
  month: string;
  days: CalendarDay[];
};
const generateCalendarFromMonth = (
  month: string,
  transactions: FinancialTransaction[]
): Calendar => {
  const firstDayOfMonth = dayjs(month).startOf("month").toDate();
  const lastDayOfMonth = dayjs(month).endOf("month").toDate();
  const firstDayOfCalendar = dayjs(firstDayOfMonth).startOf("week").toDate();
  const lastDayOfCalendar = dayjs(lastDayOfMonth).endOf("week").toDate();
  const calendar: CalendarDay[] = [];
  let day = firstDayOfCalendar;
  while (day <= lastDayOfCalendar) {
    // if there are transactions for the day, add them to the calendar
    const transactionsForDay = transactions.filter((transaction) => {
      return dayjs(transaction.date).isSame(day, "day");
    });
    calendar.push({
      date: day.toISOString().split("T")[0],
      transactions: transactionsForDay,
      isCurrentMonth: day >= firstDayOfMonth && day <= lastDayOfMonth,
      isToday: dayjs(day).isSame(dayjs(), "day"),
      isSelected: dayjs(day).isSame(dayjs(month), "day"),
    });
    day.setDate(day.getDate() + 1);
  }
  // if number of weeks is less than 6 add the rest of the days to the calendar
  if (calendar.length < 42) {
    const lastDayOfCalendar = calendar[calendar.length - 1].date;
    const lastDayOfCalendarDate = dayjs(lastDayOfCalendar).toDate();
    let day = dayjs(lastDayOfCalendarDate).add(1, "day").toDate();
    while (calendar.length < 42) {
      calendar.push({
        date: day.toISOString().split("T")[0],
        transactions: [],
        isCurrentMonth: false,
        isToday: dayjs(day).isSame(dayjs(), "day"),
        isSelected: dayjs(day).isSame(dayjs(month), "day"),
      });
      day.setDate(day.getDate() + 1);
    }
  }
  return { month: dayjs(month).format("MMMM YYYY"), days: calendar };
};
const BudgetCalendar = ({
  transactions,
}: {
  transactions: FinancialTransaction[];
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [month, setMonth] = React.useState(dayjs().format("MMMM YYYY"));
  const [days, setDays] = React.useState<
    {
      date: string;
      transactions: FinancialTransaction[];
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
    }[]
  >([]);
  const [selectedDay, setSelectedDay] = React.useState<CalendarDay | undefined>(
    undefined
  );
  React.useEffect(() => {
    const { month, days } = generateCalendarFromMonth(
      currentMonth,
      transactions
    );
    setMonth(month);
    setDays(days);
    setSelectedDay(days.find((day) => day.isSelected));
  }, [currentMonth, transactions]);

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none lg:px-0">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">{month}</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div
              className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  dayjs(currentMonth).subtract(1, "month").toISOString()
                )
              }
              className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentMonth(dayjs().toISOString())}
              className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  dayjs(currentMonth).add(1, "month").toISOString()
                )
              }
              className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setCurrentMonth(dayjs().toISOString())}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Go to today
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days &&
              days.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white"
                      : "bg-gray-50 text-gray-500",
                    "relative px-3 py-2 lg:min-h-[120px]"
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={
                      day.isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    }
                  >
                    {day.date.split("-").pop().replace(/^0/, "")}
                  </time>
                  {day.transactions.length > 0 && (
                    <ol className="mt-2">
                      {day.transactions.slice(0, 2).map((transaction) => (
                        <li key={transaction.id}>
                          <Popover.Root>
                            <Popover.Trigger asChild>
                              <button className="group flex w-full">
                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                  {transaction.category?.name}
                                </p>
                                <p className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">
                                  {"$" +
                                    formatNumberAsCurrency(transaction.amount)}
                                </p>
                              </button>
                            </Popover.Trigger>

                            <Popover.Portal>
                              <Popover.Content
                                className="rounded-lg p-5 w-[260px] bg-slate-100 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                                sideOffset={5}
                              >
                                <div className="overflow-hidden">
                                  <div className="relative grid gap-8 bg-slate-100 p-3 lg:grid-cols-1">
                                    {day.transactions.map((item) => (
                                      <a
                                        key={item.id}
                                        href="#"
                                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-50 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-50"
                                      >
                                        <div className={`flex h-10 w-10 px-2 rounded-full ${item.category?.backgroundColor} ${item.category?.foregroundColor} shrink-0 items-center justify-center sm:h-10 sm:w-10`}>
                                          {item.category?.icon}
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-medium text-gray-900">
                                            {"$" + formatNumberAsCurrency(item.amount)}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {item.category?.name}
                                          </p>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                                <Popover.Arrow className="fill-slate-100" />
                              </Popover.Content>
                            </Popover.Portal>
                          </Popover.Root>
                        </li>
                      ))}
                      {day.transactions.length > 2 && (
                        <li className="text-gray-500">
                          + {day.transactions.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days &&
              days.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                    (day.isSelected || day.isToday) && "font-semibold",
                    day.isSelected && "text-white",
                    !day.isSelected && day.isToday && "text-indigo-600",
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-900",
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isSelected &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      day.isSelected && day.isToday && "bg-indigo-600",
                      day.isSelected && !day.isToday && "bg-gray-900",
                      "ml-auto"
                    )}
                  >
                    {day.date.split("-").pop().replace(/^0/, "")}
                  </time>
                  <span className="sr-only">
                    {day.transactions.length} transactions
                  </span>
                  {day.transactions.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {day.transactions.map((transaction) => (
                        <span
                          key={transaction.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>
      {selectedDay && selectedDay?.transactions.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">
                    {transaction?.category?.name}
                  </p>
                  <time
                    dateTime={transaction.date}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    {transaction.category?.icon && (
                      <span className="mr-2 h-5 w-5 text-gray-400">
                        {transaction.category.icon}
                      </span>
                    )}
                    ${formatNumberAsCurrency(transaction.amount)}
                  </time>
                </div>
                <a
                  href="#"
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit
                  <span className="sr-only">
                    , ${formatNumberAsCurrency(transaction.amount)}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
const PopoverPanel = ({
  transactions,
}: {
  transactions: FinancialTransaction[];
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Solutions</span>
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  {transactions.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                        {item.category?.icon}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {item.category?.name}
                        </p>
                        <p className="text-sm text-gray-500">{item.merchant}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="bg-gray-50 p-4">
                  <a
                    href="##"
                    className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        Documentation
                      </span>
                    </span>
                    <span className="block text-sm text-gray-500">
                      Start integrating products and tools
                    </span>
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
export default BudgetCalendar;
