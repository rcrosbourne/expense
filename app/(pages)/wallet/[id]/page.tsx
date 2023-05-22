"use client";
import React from "react";
import { classNames, formatNumberAsCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import WalletOverview from "@/app/(pages)/wallet/[id]/components/walletOverview";
import { transactions } from "@/data/transactions";
import { FinancialTransaction } from "@/types/financialTransaction";
import ConfirmDialog from "@/components/confirmDialog";
import TransactionList from "@/app/(pages)/wallet/[id]/components/transactionList";
import { Tab } from "@headlessui/react";
import BudgetCalendar from "@/app/(pages)/wallet/[id]/components/budgetCalendar";
import {
  BarChartIcon,
  CalendarIcon,
  CheckListIcon,
} from "@/components/icons";
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
import TransactionBreakdown from "@/app/(pages)/wallet/[id]/components/transactionBreakdown";
import AddTransaction from "@/app/(pages)/wallet/[id]/components/addTransaction";
import { useImmerReducer } from "use-immer";
import useWindowSize, { WindowSize } from "@/hooks/useWindowSize";
import BudgetBreakdown from "@/app/(pages)/wallet/[id]/components/budgetBreakdown";

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

type State = {
  openDeleteDialog?: boolean;
  transactionForEdit?: FinancialTransaction;
  transactionForDelete?: FinancialTransaction;
  showDialog?: boolean;
  showAsModal?: boolean;
};
const INITIAL_STATE: State = {
  openDeleteDialog: false,
  transactionForEdit: undefined,
  transactionForDelete: undefined,
  showAsModal: false,
};
export type Actions = {
  type:
    | "add-transaction"
    | "edit-transaction"
    | "save-transaction"
    | "delete-transaction"
    | "deleting-transaction"
    | "deleted-transaction"
    | "cancel";
  editTransaction?: FinancialTransaction;
  newTransaction?: FinancialTransaction;
  deleteTransaction?: FinancialTransaction;
  windowSize?: WindowSize;
};
function reducer(state: State, actions: Actions) {
  switch (actions.type) {
    case "add-transaction": {
      state.transactionForEdit = undefined;
      state.showAsModal =
        actions && actions.windowSize && actions.windowSize.width < 640;
      return;
    }
    case "cancel": {
      state.transactionForEdit = undefined;
      state.transactionForDelete = undefined;
      state.openDeleteDialog = false;
      state.showAsModal = false;
      return;
    }
    case "edit-transaction": {
      state.transactionForEdit = actions.editTransaction;
      state.showAsModal =
        actions && actions.windowSize && actions.windowSize.width < 640;
      return;
    }
    case "save-transaction": {
      state.transactionForEdit = undefined;
      state.showAsModal = false;
      return;
    }
    case "deleting-transaction": {
      state.transactionForDelete = actions.deleteTransaction;
      state.openDeleteDialog = true;
      return;
    }
    case "deleted-transaction": {
      state.transactionForDelete = actions.deleteTransaction;
      state.openDeleteDialog = false;
      return;
    }
  }
}

const Wallet = () => {
  const transactionRef = React.useRef(null);
  // add reducer to manage the user action
  const [state, dispatch] = useImmerReducer(reducer, INITIAL_STATE);
  const handleDelete = (transaction: FinancialTransaction) => {
    dispatch({ type: "deleting-transaction", deleteTransaction: transaction });
  };
  // get route params
  const windowSize = useWindowSize();

  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Wallet</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <WalletOverview dispatch={dispatch} />
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
                        editingTransaction={state.transactionForEdit}
                        transactionRef={transactionRef}
                        onEdit={(transactionForEdit) =>
                          dispatch({
                            type: "edit-transaction",
                            editTransaction: transactionForEdit,
                            windowSize,
                          })
                        }
                        onCancel={(t) => dispatch({ type: "cancel" })}
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
                              <h3 className="hidden md:inline-block">
                                Performance
                              </h3>
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
                                  <span className="hidden sm:inline-block">
                                    Income
                                  </span>
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
                                  <span className="hidden sm:inline-block">
                                    Expense
                                  </span>
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
                                  Budget
                                </Tab>
                              </Tab.List>
                            </div>
                            <Tab.Panels className="mt-4">
                              <Tab.Panel>
                                <TransactionBreakdown
                                  transactions={transactions.filter(
                                    (t) => t.type === "income"
                                  )}
                                />
                              </Tab.Panel>
                              <Tab.Panel>
                                <TransactionBreakdown
                                  transactions={transactions.filter(
                                    (t) => t.type === "expense"
                                  )}
                                />
                              </Tab.Panel>
                              <Tab.Panel>
                                <BudgetBreakdown
                                  transactions={transactions.filter(
                                    (t) => t.type === "expense"
                                  )}
                                  walletBudget={500_000}
                                />
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
          <div className="sm:grid grid-cols-1 gap-4 hidden sm:sticky sm:top-[10%]">
            {/* Add Income and Expenses */}
            <AddTransaction
              transactionToBeEdited={state.transactionForEdit}
              showAsModal={state.showAsModal ?? false}
              dispatch={dispatch}
            />
          </div>{" "}
        </div>
      </div>

      <ConfirmDialog
        openConfirm={state.openDeleteDialog!}
        setOpenConfirm={(isOpen) =>
          !isOpen
            ? dispatch({ type: "cancel" })
            : dispatch({ type: "deleting-transaction" })
        }
        title={"Delete expense/income"}
        message={`Are you sure you want to delete expense ${
          state.transactionForDelete?.category?.name
        } with amount $${formatNumberAsCurrency(
          state.transactionForDelete?.amount
        )} 
          This action cannot be undone.`}
        confirmButtonText={"Delete"}
        cancelButtonText={"Cancel"}
        confirm={(status) => {
          if (status) {
            dispatch({
              type: "deleted-transaction",
              deleteTransaction: state.transactionForDelete,
            });
          } else {
            dispatch({ type: "cancel", deleteTransaction: undefined });
          }
        }}
      />
    </main>
  );
};
export default Wallet;
