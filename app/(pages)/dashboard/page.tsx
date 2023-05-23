import {PortfolioStat, WalletWidgetProps} from "@/types";
import React, {Suspense} from "react";
import Home from "@/app/(pages)/dashboard/home";
import {redirect} from "next/navigation";
import {getWallets} from "@/lib/server/walletFunctions";
import currentUser from "@/lib/server/currentUser";
import {LucideLoader2} from "lucide-react";

export default async function Page() {
  const stats: PortfolioStat[] = [
  { label: "Total", value: "$100,000.00" },
  { label: "Last 30 days", value: "$300,000.00" },
  { label: "Last 7 days", value: "$75,000.00" },
];
  const user = await currentUser();
  if(!user) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  const walletsFromDb = await getWallets();
  const initWallets: WalletWidgetProps[] = walletsFromDb.map((wallet) => {
    return {
      ...wallet,
      budget: wallet.budget.toNumber(),
      href: `/wallet/${wallet.id}`,
      iconForeground:
        wallet.category === "business" ? "text-purple-700" : "text-teal-700",
      iconBackground:
        wallet.category === "business" ? "bg-purple-50" : "bg-teal-50",
      currentBalance: "0",
    };
  });
  return (
      <>
        <Suspense fallback={<LucideLoader2 className="animate-spin"/>}>
          <Home wallets={initWallets} stats={stats}/>
        </Suspense>
      </>
  );
}
