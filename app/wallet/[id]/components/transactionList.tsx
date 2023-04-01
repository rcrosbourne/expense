import React from "react";
import {classNames, formatNumberAsCurrency} from "@/app/utils";
import { FinancialTransaction } from "@/app/types/financialTransaction";

const TransactionList = ({
  transactions,
  editingTransaction,
  transactionRef,
  onEdit,
  onCancel,
  onDelete,
}: {
  transactions: FinancialTransaction[];
  editingTransaction: FinancialTransaction | null;
  transactionRef: React.RefObject<HTMLLIElement>;
  onEdit: (transaction: FinancialTransaction) => void;
  onCancel: (transaction: FinancialTransaction) => void;
  onDelete: (transaction: FinancialTransaction) => void;
}) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {transactions.map((transaction) => {
        return (
          <li
            className={classNames(
              editingTransaction && editingTransaction.id === transaction.id
                ? `ring-2 ring-inset ring-cyan-500`
                : `ring-none`,
              `group  col-span-1 divide-y divide-gray-200 rounded-lg shadow bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500`
            )}
            ref={transactionRef}
            key={transaction.id}
          >
            <div className="flex w-full items-center justify-between space-x-6 pr-6 py-6 relative">
              <div className="absolute text-slate-950 top-0 left-0 flex items-center justify-center mt-2 ml-2">
                {transaction.periodicity !== "One-time payment" && (
                  <>
                    <span className="sr-only">Recurring</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-current"
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
                        fillRule="evenodd"
                        d="M6.754 4.686A9 9 0 1 1 3 12a1 1 0 1 1 2 0 7 7 0 1 0 3.386-5.996h.368a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0zM12 7a1 1 0 0 1 1 1v3.586l2.207 2.207a1 1 0 0 1-1.414 1.414l-2.5-2.5A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1z"
                        clipRule="evenodd"
                        data-original="url(#a)"
                      />
                    </svg>
                  </>
                )}
              </div>
              <div className="flex-1  mt-3">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-lg font-medium text-gray-900">
                    ${formatNumberAsCurrency(transaction.amount)}
                  </h3>
                  <span
                    className={`inline-block truncate flex-shrink-0 rounded-full ${
                      transaction?.category?.backgroundColor ?? "bg-cyan-600"
                    } px-2 py-0.5 text-xs font-medium text-slate-900`}
                  >
                    {transaction?.category?.name ?? "None"}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {transaction.date}
                </p>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {transaction.merchant}
                </p>
              </div>
              <div
                className={`h-20 w-20 flex-shrink-0 rounded-full ${
                  transaction?.category?.backgroundColor ?? "bg-cyan-600"
                } p-3`}
              >
                {transaction?.category?.icon}
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  {!editingTransaction || editingTransaction.id !== transaction.id ? (
                    <button
                      type="button"
                      onClick={() => onEdit(transaction)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-gray-400"
                      >
                        <path
                          fill="#607d8b"
                          d="M17 24H3c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h8a1 1 0 1 1 0 2H3c-.552 0-1 .449-1 1v14c0 .551.448 1 1 1h14c.552 0 1-.449 1-1v-8a1 1 0 1 1 2 0v8c0 1.654-1.346 3-3 3z"
                        />
                        <path
                          fill="#42a5f5"
                          d="m17.288 3.177-7.912 7.912a.506.506 0 0 0-.137.255l-.707 3.536a.498.498 0 0 0 .491.598l.098-.01 3.535-.707a.494.494 0 0 0 .256-.137l7.912-7.912zM23.268.732a2.502 2.502 0 0 0-3.535 0l-1.384 1.384 3.535 3.535 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z"
                        />
                        <path
                          fill="#546d79"
                          d="M19 12a1 1 0 0 0-1 1v8c0 .551-.448 1-1 1H3a.997.997 0 0 1-.707-.293L.88 23.12c.543.544 1.293.88 2.12.88h14c1.654 0 3-1.346 3-3v-8a1 1 0 0 0-1-1z"
                        />
                        <g fill="#3990d5">
                          <path d="M19.056 4.944 8.669 15.331a.5.5 0 0 0 .354.146l.098-.01 3.535-.707a.494.494 0 0 0 .256-.137l7.912-7.912zM23.268.732l-3.151 3.151 1.768 1.768 1.384-1.384C23.74 3.796 24 3.168 24 2.5s-.26-1.296-.732-1.768z" />
                        </g>
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onCancel(transaction)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-5 w-5"
                      >
                        <linearGradient
                          id="a"
                          x1="79.385"
                          x2="432.659"
                          y1="432.808"
                          y2="79.534"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset=".006" stopColor="#3b8bf5" />
                          <stop offset="1" stopColor="#c7d5f3" />
                        </linearGradient>
                        <path
                          fill="url(#a)"
                          d="M79.331 432.754c-97.359-97.442-97.359-255.921 0-353.276 97.664-97.664 255.7-97.658 353.276.004 62.444 62.444 87.365 154.305 65.03 239.733-1.61 6.159-7.897 9.833-14.07 8.238-6.159-1.61-9.848-7.912-8.238-14.07C495.6 235.844 472.98 152.465 416.3 95.782c-88.616-88.686-232.051-88.607-320.665 0-88.371 88.37-88.367 232.223.004 320.673 106.537 106.537 286.044 80.879 358.459-50.16 3.089-5.57 10.096-7.593 15.669-4.515 5.573 3.081 7.593 10.096 4.515 15.669-79.833 144.412-277.563 172.702-394.951 55.305zm270.198-270.193c-4.504-4.504-11.8-4.504-16.303 0l-77.245 77.245-77.245-77.245c-4.504-4.504-11.8-4.504-16.303 0-4.504 4.5-4.504 11.804 0 16.303l77.245 77.245-77.245 77.245c-4.504 4.5-4.504 11.803 0 16.303 4.504 4.504 11.8 4.504 16.303 0l77.245-77.245 77.245 77.245c4.504 4.504 11.8 4.504 16.303 0 4.504-4.5 4.504-11.803 0-16.303l-77.245-77.245 77.245-77.245c4.503-4.5 4.503-11.803 0-16.303z"
                        />
                      </svg>
                      Cancel
                    </button>
                  )}
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => onDelete(transaction)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 512 512"
                      className="h-5 w-5 text-gray-400"
                    >
                      <path
                        fill="#fc0005"
                        fillRule="evenodd"
                        d="M170.8 14.221A14.21 14.21 0 0 1 185 .014L326.991.006a14.233 14.233 0 0 1 14.2 14.223v35.117H170.8zm233.461 477.443a21.75 21.75 0 0 1-21.856 20.33H127.954a21.968 21.968 0 0 1-21.854-20.416L84.326 173.06H427.5l-23.234 318.6zm56.568-347.452H51.171v-33A33.035 33.035 0 0 1 84.176 78.2l343.644-.011a33.051 33.051 0 0 1 33 33.02v33zm-270.79 291.851a14.422 14.422 0 1 0 28.844 0V233.816a14.42 14.42 0 0 0-28.839-.01v202.257zm102.9 0a14.424 14.424 0 1 0 28.848 0V233.816a14.422 14.422 0 0 0-28.843-.01z"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default TransactionList;
