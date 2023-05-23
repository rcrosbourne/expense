import {PortfolioStat } from "@/types";
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
  return (
      <>
        <Suspense fallback={<LucideLoader2 className="animate-spin"/>}>
          <Home wallets={walletsFromDb} stats={stats}/>
        </Suspense>
      </>
  );
}
