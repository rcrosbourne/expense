import React from "react";
import {FinancialTransaction} from "@/app/types";
import PieChart from "@/app/wallet/[id]/components/pieChart";

const IncomeBreakdown = ({transactions}: {transactions: FinancialTransaction[]}) => {
   return (
       <PieChart transactions={transactions} />
   )
}
export default IncomeBreakdown;