
import {type WalletWidgetProps} from "@/app/types";
import React from "react";
import Home from "@/app/home";
export default function Page() {
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
  return (
   <Home wallets={wallets} />
  );
}
