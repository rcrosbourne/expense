import React from "react";
import Transactions from "@/app/(pages)/wallet/[id]/transactions";
import {getWallet} from "@/lib/server/walletFunctions";
import { z } from "zod";
import {convertFromRawToWallet} from "@/lib/utils/convertDBWalletToWidget";
import {generateWalletStats} from "@/lib/utils/generateStats";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
const Page = async (context: z.infer<typeof routeContextSchema>) => {
  const {
    params: { id },
  } = routeContextSchema.parse(context);
  const rawWallet = await getWallet(id);
  if (!rawWallet) {
    throw new Error("Wallet not found");
  }
  const wallet = convertFromRawToWallet(rawWallet);
  const stats = generateWalletStats(wallet);
  return (
    <>
      <Transactions transactions={wallet.transactions} wallet={wallet} stats={stats}/>
    </>
  );
};
export default Page;
