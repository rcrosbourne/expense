import {Stat, WalletWidgetProps} from "@/types";
import React, {Suspense} from "react";
import Home from "@/app/(pages)/dashboard/home";
import {redirect} from "next/navigation";
import {getWallets} from "@/lib/server/walletFunctions";
import currentUser from "@/lib/server/currentUser";
import {LucideLoader2} from "lucide-react";
import {convertFromRawToWallet} from "@/lib/utils/convertDBWalletToWidget";
import {generatePortfolioStats} from "@/lib/utils/generateStats";

export default async function Page() {
//   const stats: PortfolioStat[] = [
//   { label: "Total", value: "$100,000.00" },
//   { label: "Last 30 days", value: "$300,000.00" },
//   { label: "Last 7 days", value: "$75,000.00" },
// ];
  const user = await currentUser();
  if(!user) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  const rawWallets = await getWallets();
  const wallets: WalletWidgetProps[] = rawWallets.map((wallet) => {
    return convertFromRawToWallet(wallet);
  });
  console.log(JSON.stringify(wallets, null, 2));
  const stats: Stat[] = generatePortfolioStats(wallets);
  return (
      <>
        <Suspense fallback={<LucideLoader2 className="animate-spin"/>}>
          <Home wallets={wallets} stats={stats}/>
        </Suspense>
      </>
  );
}
