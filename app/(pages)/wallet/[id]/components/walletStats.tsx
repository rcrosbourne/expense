import React from "react";
import { Stat } from "@/types";

const WalletStats = ({ stats }: { stats: Stat[] }) => {
  return (
    <>
      {" "}
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start"
        >
          <span className="text-gray-400 text-xs">{stat.label}</span>
          <span className="text-gray-900 text-xl">{stat.value}</span>{" "}
        </div>
      ))}
    </>
  );
};
export default WalletStats;
