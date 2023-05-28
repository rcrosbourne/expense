// Sever-side functions for wallet CRUD operations.
import "server-only";

import prisma from "@/lib/prisma";
import currentUser from "@/lib/server/currentUser";
import { FinancialTransaction, Wallet } from "@/types";

export async function addTransaction(
  walletId: string,
  financialTransaction: FinancialTransaction
) {
  //Wallet should already be validated
  const user = await currentUser();
  return await prisma.financialTransaction.create({
    data: {
      amount: financialTransaction.amount ?? 0,
      type: financialTransaction.type,
      date: financialTransaction?.date?.startDate ?? new Date(),
      notes: financialTransaction.notes,
      merchant: financialTransaction.merchant,
      periodicity: financialTransaction.periodicity,
      category: {
        connect: {
          name_type: {
            name: financialTransaction?.category?.name || "Uncategorized",
            type: financialTransaction?.type,
          },
        },
      },
      wallet: {
        connect: {
          id: walletId,
        },
      },
    },
  });
}
export async function getTransactions(wallet: Wallet) {
  const user = await currentUser();
  return await prisma.financialTransaction.findMany({
    where: {
      walletId: wallet?.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function deleteTransaction(
  walletId: string,
  transactionId: string
) {
  const user = await currentUser();
  // get wallet
  const transaction = await prisma.financialTransaction.findFirst({
    where: {
      id: transactionId,
      walletId,
    },
  });
  if (!transaction) {
    console.log("no transaction found");
    return;
  }
  // delete wallet
  return await prisma.financialTransaction.delete({
    where: {
      id: transactionId,
    },
  });
}
export async function updateTransaction(
  wallet: Wallet,
  transaction: FinancialTransaction
) {
  const user = await currentUser();
  // get wallet
  const transactionToUpdate = await prisma.financialTransaction.findFirst({
    where: {
      id: transaction.id,
    },
  });
  if (!transactionToUpdate) {
    console.log("no transaction found");
    return;
  }
  // update wallet
  return await prisma.financialTransaction.update({
    where: {
      id: transaction.id,
    },
    data: {
      amount: transaction.amount,
      type: transaction.type,
      date: transaction?.date?.startDate ?? new Date(),
      notes: transaction.notes,
      merchant: transaction.merchant,
      periodicity: transaction.periodicity,
      category: {
        connect: {
          name_type: {
            name: transaction?.category?.name || "Uncategorized",
            type: transaction?.type,
          },
        },
      },
      wallet: {
        connect: {
          id: wallet.id,
        },
      },
    },
  });
}

