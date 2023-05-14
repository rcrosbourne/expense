import { Wallet } from "@/app/types";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function addWallet(wallet: Wallet) {
  //Wallet should already be validated
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("No session found");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("No session found");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });
  return await prisma.wallet.findMany({
    where: {
      userId: user?.id,
    },
  });
}
