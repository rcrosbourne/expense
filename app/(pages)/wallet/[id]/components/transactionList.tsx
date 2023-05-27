import React from "react";
import {
  classNames,
  formatNumberAsCurrency,
} from "@/lib/utils";
import { FinancialTransaction } from "@/types";
import {
  CancelIcon,
  EditIcon,
  RecurringIcon,
  TrashCanIcon,
} from "@/components/icons";
import formatDateOrReturnDefault from "@/lib/utils/formatDateOrReturnDefault";
import {useDeleteTransaction, useSetDeleteTransaction, useSetOpenDeleteModal, useSetShowAsModal, useSetTransaction, useTransaction} from "@/lib/store/financialTransactionStore";
import {INITIAL_STATE} from "@/app/(pages)/wallet/[id]/components/addTransaction";
import useWindowSize from "@/hooks/useWindowSize";

const TransactionList = ({
  transactions,
  editingTransaction,
  transactionRef,
}: {
  transactions: FinancialTransaction[];
  editingTransaction: FinancialTransaction | undefined;
  transactionRef: React.RefObject<HTMLLIElement>;
}) => {
  const editTransaction = useTransaction();
  const setEditTransaction = useSetTransaction();
  const deleteTransaction = useDeleteTransaction();
  const setDeleteTransaction = useSetDeleteTransaction();
  const setOpenDeleteModal = useSetOpenDeleteModal();
  const setShowAsModal = useSetShowAsModal();
  const windowSize = useWindowSize();
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
                    <RecurringIcon className="h-6 w-6 fill-current" />
                  </>
                )}
              </div>
              <div className="flex-1  mt-3">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-lg font-medium text-gray-900">
                    ${formatNumberAsCurrency(transaction.amount)}
                  </h3>
                  <span
                    className={`inline-block truncate flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-slate-900 ${transaction.category?.backgroundColor}`}
                  >
                    {transaction?.category?.name ?? "None"}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {formatDateOrReturnDefault(transaction.date)}
                </p>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {transaction.merchant}
                </p>
              </div>
              <div
                className={`h-20 w-20 flex-shrink-0 rounded-full p-3 ${transaction.category?.backgroundColor}`}
              >
                {transaction?.category?.icon}
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  {!editTransaction ||
                  editTransaction.id !== transaction.id ? (
                    <button
                      type="button"
                      onClick={() => {setEditTransaction(transaction); setShowAsModal(windowSize.width < 640)}}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <EditIcon className="h-5 w-5 text-gray-400" />
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {setEditTransaction(INITIAL_STATE); setShowAsModal(windowSize.width < 640)}}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <CancelIcon className="h-5 w-5 fill-current" />
                      Cancel
                    </button>
                  )}
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => { setDeleteTransaction(transaction); setOpenDeleteModal(true)}}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <TrashCanIcon className="h-5 w-5 text-gray-400" />
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
