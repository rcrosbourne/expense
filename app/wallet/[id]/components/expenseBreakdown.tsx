import React from "react";
import { FinancialTransaction } from "@/app/types";
import PieChart from "@/app/wallet/[id]/components/pieChart";
import {
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  TooltipItem,
} from "chart.js";
import { addAlphaToHsl, formatNumberAsCurrency } from "@/app/utils";
import BarChart from "@/app/wallet/[id]/components/barChart";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Income Breakdown by category",
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
const ExpenseBreakdown = ({
  transactions,
}: {
  transactions: FinancialTransaction[];
}) => {
  function calculateIncomeBreakdownByType(
    transactions: FinancialTransaction[]
  ) {
    //filter for income transactions
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "expense"
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
          backgroundColor.push(
            addAlphaToHsl(category.backgroundColorAsHsl!, 0.8)
          );
          borderColor.push(category.backgroundColorAsHsl!);
        } else {
          data[index] += transaction.amount;
        }
      }
    });
    return { labels, data, backgroundColor, borderColor };
  }

  function pieChartConfiguration(): ChartData<"pie", number[], unknown> {
    const { labels, data, backgroundColor, borderColor } =
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
  function barChartConfiguration(): ChartData<"bar", number[], unknown> {
    const startDate = dayjs().startOf("year");
    const endDate = dayjs();

    const transactionsByMonth: { [key: number]: { [key: string]: number } } =
      {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        const transactionDate = dayjs(transaction.date);

        if (transactionDate.isBetween(startDate, endDate, "day", "[]")) {
          const month = transactionDate.month();

          if (!transactionsByMonth[month]) {
            transactionsByMonth[month] = {};
          }

          const category = transaction.category!.name;

          if (!transactionsByMonth[month][category]) {
            transactionsByMonth[month][category] = 0;
          }

          transactionsByMonth[month][category] += transaction.amount;
        }
      });
    const labels = Array.from({ length: dayjs().month() + 1 }, (_, i) =>
      dayjs().month(i).format("MMM")
    );
    const categories = [
      ...new Set(
        transactions
          .filter((t) => t.type === "expense")
          .map((t) => t.category?.name)
      ),
    ];
    const datasets = categories.map((category) => ({
      label: category,
      data: labels.map(
        (_, month) => transactionsByMonth[month]?.[category!] ?? 0
      ),
      backgroundColor: transactions.find((t) => t.category?.name === category)
        ?.category?.backgroundColorAsHsl,
    }));
    return {
        labels,
        datasets,
    };
  }
  const barChartOptions: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: true,
        text: "Income breakdown YTD",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <div>
      <PieChart dataFunction={pieChartConfiguration} options={options} />
      <BarChart
        dataFunction={barChartConfiguration}
        options={barChartOptions}
      />
    </div>
  );
};
export default ExpenseBreakdown;
