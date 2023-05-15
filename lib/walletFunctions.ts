import { Wallet } from "@/app/types";
import prisma from "@/lib/prisma";
import currentUser from "@/lib/currentUser";

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
export async function getWallets() {
  const user = await currentUser();
  return await prisma.wallet.findMany({
    where: {
      userId: user?.id,
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
  console.log({ wallet });
  if (!wallet) return;
  // delete wallet
  await prisma.wallet.delete({
    where: {
      id: walletId,
    },
  });
}
