// Sever-side functions for wallet CRUD operations.
import "server-only";

import { Wallet, WalletWidgetProps } from "@/types";
import prisma from "@/lib/prisma";
import currentUser from "@/lib/server/currentUser";

export async function addWallet(wallet: Wallet) {
  //Wallet should already be validated
  const user = await currentUser();
  return await prisma.wallet.create({
    data: {
      name: wallet.name,
      budget: wallet.budget,
      category: wallet.category,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
}
export async function getWallet(walletId: string) {
  const user = await currentUser();
  return await prisma.wallet.findFirst({
    where: {
      userId: user?.id,
      id: walletId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getWallets() {
  const user = await currentUser();
  return await prisma.wallet.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function deleteWallet(walletId: string) {
  const user = await currentUser();
  // get wallet
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId: user?.id,
    },
  });
  if (!wallet) {
    console.log("no wallet found");
    return;
  }
  // delete wallet
  return await prisma.wallet.delete({
    where: {
      id: wallet.id,
    },
  });
}
export async function updateWallet(wallet: Wallet) {
  const user = await currentUser();
  // get wallet
  const walletToUpdate = await prisma.wallet.findFirst({
    where: {
      id: wallet.id,
      userId: user?.id,
    },
  });
  if (!walletToUpdate) {
    console.log("no wallet found");
    return;
  }
  // update wallet
  return await prisma.wallet.update({
    where: {
      id: wallet.id,
    },
    data: {
      name: wallet.name,
      budget: wallet.budget,
      category: wallet.category,
    },
  });
}
