
import {PortfolioStat, type WalletWidgetProps} from "@/app/types";
import React from "react";
import Home from "@/app/(pages)/dashboard/home";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const wallets: WalletWidgetProps[] = [
    {
      id: 1,
      name: "My Personal Wallet",
      href: "/wallet/1",
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
      currentBalance: "$100,000.00",
      category: "personal",
      budget: "$75,000.00",
    },
    {
      id: 2,
      name: "My Business Wallet",
      href: "/wallet/2",
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      currentBalance: "$100,000.00",
      category: "business",
      budget: "$30,000.00",
    },
  ];
  const stats: PortfolioStat[] = [
  { label: "Total", value: "$100,000.00" },
  { label: "Last 30 days", value: "$300,000.00" },
  { label: "Last 7 days", value: "$75,000.00" },
];
  const session = await getServerSession(authOptions)
  if(!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }
  return (
      <>
        <Home wallets={wallets} stats={stats}/>
      </>
  );
}
