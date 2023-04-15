import React from "react";
import {FinancialTransaction} from "@/app/types";
import PieChart from "@/app/wallet/[id]/components/pieChart";
import {ChartData, ChartTypeRegistry, TooltipItem} from "chart.js";
import {addAlphaToHsl, formatNumberAsCurrency} from "@/app/utils";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Income Breakdown by type',
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => {
          return tooltipItems[0].label;
        },
        label: (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) => {
          return `$${formatNumberAsCurrency(tooltipItem.raw as number)}`;
        },
      },
    },
  },
};
const IncomeBreakdown = ({transactions}: {transactions: FinancialTransaction[]}) => {
  function calculateIncomeBreakdownByType(transactions: FinancialTransaction[]) {
    // filter out transactions that are not of type income.
    const incomeTransactions = transactions.filter(
        (transaction) => transaction.type === "income"
    );
    let labels: string[] = [];
    let data: number[] = [];
    let backgroundColor: string[] = [];
    let borderColor: string[] = [];
    // create a map of categories and their total amount.
    incomeTransactions.forEach((transaction) => {
      const category = transaction.category;
      if (category) {
        const index = labels.indexOf(category.name);
        if (index === -1) {
          labels.push(category.name);
          data.push(transaction.amount);
          // add an alpha channel of 80% to the background color.
          backgroundColor.push(addAlphaToHsl(category.backgroundColorAsHsl!,0.8));
          borderColor.push(category.backgroundColorAsHsl!);
        } else {
          data[index] += transaction.amount;
        }
      }
    });
    return {labels, data, backgroundColor, borderColor};
  }

  function chartDataConfiguration(): ChartData<"pie", number[], unknown> {
    const {labels, data, backgroundColor, borderColor} =
        calculateIncomeBreakdownByType(transactions);
    return {
      labels,
      datasets: [
        {
          type: "pie" as const,
          data,
          backgroundColor,
          borderColor,
          borderWidth: 2,
        },
      ],
    };
  }

  return (
      <PieChart dataFunction={chartDataConfiguration} options={options}/>
  )
}
export default IncomeBreakdown;