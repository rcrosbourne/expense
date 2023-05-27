import React from "react";
import { FinancialTransaction } from "@/types";
import Transaction from "@/app/(pages)/wallet/[id]/components/transaction";
import ConfirmDialog from "@/components/confirmDialog";
import {
  useDeleteTransaction,
  useOpenDeleteModal,
  useSetOpenDeleteModal,
  useSetTransaction,
  useTransaction,
} from "@/lib/store/financialTransactionStore";
import { formatNumberAsCurrency } from "@/lib/utils";

const TransactionList = ({
  transactions,
  transactionRef,
}: {
  transactions: FinancialTransaction[];
  transactionRef: React.RefObject<HTMLLIElement>;
}) => {
  const openDeleteModal = useOpenDeleteModal();
  const deleteTransaction = useDeleteTransaction();
  const setOpenedDeleteModal = useSetOpenDeleteModal();
  const setTransaction = useSetTransaction();
  const message = (transaction?: FinancialTransaction) => {
    if(!transaction) return "";
    return `Are you sure you want to delete expense ${
      transaction.category?.name
    } with amount $${formatNumberAsCurrency(transaction.amount)}
            This action cannot be undone.`;
  };
  const onConfirm = (status: boolean) => {
    if (status) {
      console.log("delete", deleteTransaction);
      setOpenedDeleteModal(!openDeleteModal);
      setTransaction({
        id: "0",
        type: "expense",
        amount: undefined,
        date: { startDate: null, endDate: null },
        periodicity: "One-time payment",
      });
    } else {
      setTransaction({
        id: "0",
        type: "expense",
        amount: undefined,
        date: { startDate: null, endDate: null },
        periodicity: "One-time payment",
      });
      setOpenedDeleteModal(!openDeleteModal);
    }
  }
  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {transactions.map((transaction) => {
          return (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              transactionRef={transactionRef}
            />
          );
        })}
      </ul>
      <ConfirmDialog
        openConfirm={openDeleteModal}
        setOpenConfirm={setOpenedDeleteModal}
        title={"Delete expense/income"}
        message={message(deleteTransaction)}
        confirmButtonText={"Delete"}
        cancelButtonText={"Cancel"}
        confirm={onConfirm}
      />
    </>
  );
};
export default TransactionList;
