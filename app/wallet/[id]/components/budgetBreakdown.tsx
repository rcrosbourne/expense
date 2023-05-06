import React from "react";
import { FinancialTransaction } from "@/app/types";
import BarChart from "@/app/wallet/[id]/components/barChart";
import { ChartData, ChartOptions } from "chart.js";
import dayjs from "dayjs";
import { classNames, formatNumberAsCurrency } from "@/app/utils";

const BudgetBreakdown = ({
  transactions,
  walletBudget,
}: {
  transactions: FinancialTransaction[];
  walletBudget: number;
}) => {
  function barChartConfiguration(): ChartData<"bar", number[], unknown> {
    const transactionsByMonth = getTransactionsGroupedByMonth({ transactions });
    const labels = Array.from({ length: dayjs().month() + 1 }, (_, i) =>
      dayjs().month(i).format("MMM")
    );
    const expenses = labels.map((_, index) =>
      transactionsByMonth[index] ? transactionsByMonth[index]["total_cost"] : 0
    );

    const budget = labels.map((_, index) => walletBudget / labels.length);
    const datasets = [
      {
        label: "Total Expense",
        data: expenses,
        backgroundColor: "hsl(352.6,95.7%,81.8%)",
      },
      {
        label: "Budget",
        data: budget,
        backgroundColor: "hsl(229.7,93.5%,81.8%)",
      },
    ];
    return {
      labels,
      datasets,
    };
  }
  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Budget breakdown YTD",
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };
  const stats = generateStatsFromMetrics(
    generateMetrics({ transactions, walletBudget })
  );

  return (
    <>
      <BudgetStatsWidget stats={stats} />
      <BarChart
        dataFunction={barChartConfiguration}
        options={barChartOptions}
        useTotalStackedPlugin={false}
      />
    </>
  );
};

function getTransactionsGroupedByMonth({
  startDate = dayjs().startOf("year"),
  endDate = dayjs(),
  transactions = [] as FinancialTransaction[],
}) {
  const transactionsByMonth: {
    [key: number | string]: { [key: string]: number };
  } = {};
  transactions.forEach((transaction) => {
    const transactionDate = dayjs(transaction.date!.startDate);

    if (transactionDate.isBetween(startDate, endDate, "day", "[]")) {
      const month = transactionDate.month();

      if (!transactionsByMonth[month]) {
        transactionsByMonth[month] = {};
      }

      if (!transactionsByMonth[month]["total_cost"]) {
        transactionsByMonth[month]["total_cost"] = 0;
      }

      transactionsByMonth[month]["total_cost"] += transaction.amount! as number;
    }
  });
  return transactionsByMonth;
}
function generateMetrics({
  transactions,
  walletBudget,
}: {
  transactions: FinancialTransaction[];
  walletBudget: number;
}) {
  const totalExpense = transactions
    .map((t) => t.amount! as number)
    .reduce((acc, value) => value + acc);
  // get the total expenses for the month before and subtract from the current month
  // get the current month index
  const totalBudget = walletBudget;
  const totalVariance = totalBudget - totalExpense;
  const totalVariancePercentage = totalVariance / totalBudget;
  const totalVariancePercentageString = totalVariancePercentage.toLocaleString(
    undefined,
    {
      style: "percent",
    }
  );
  const totalVarianceString = formatNumberAsCurrency(totalVariance);
  const totalExpenseString = formatNumberAsCurrency(totalExpense);
  const totalBudgetString = formatNumberAsCurrency(totalBudget);
  // get all expenses up to the current month and group by month in an object
  const totalExpensesByMonth = getTransactionsGroupedByMonth({
    transactions,
  });
  // compare the last two totals from the array to get the variance
  const lastTwoTotals = Object.values(totalExpensesByMonth).slice(-2);
  const lastTwoTotalsVariance =
    lastTwoTotals[1]["total_cost"] - lastTwoTotals[0]["total_cost"];
  const lastTwoTotalsVarianceString = formatNumberAsCurrency(
    lastTwoTotalsVariance
  );
  return {
    totalVariance,
    totalVariancePercentageString,
    totalVarianceString,
    totalExpenseString,
    totalBudgetString,
    lastTwoTotalsVariance,
    lastTwoTotalsVarianceString,
  };
}
function generateStatsFromMetrics({
  totalVariance,
  totalVariancePercentageString,
  totalVarianceString,
  totalExpenseString,
  totalBudgetString,
  lastTwoTotalsVariance,
  lastTwoTotalsVarianceString,
}: Metrics) {
  const stats: BudgetStats[] = [
    {
      name: "Total Expenses",
      value: totalExpenseString,
      change: lastTwoTotalsVarianceString,
      changeType: lastTwoTotalsVariance > 0 ? "negative" : "positive",
    },
    {
      name: "Total Budget",
      value: totalBudgetString,
      change: "",
      changeType: "positive",
    },
    {
      name: "Total Variance",
      value: totalVarianceString,
      change: totalVariancePercentageString,
      changeType: totalVariance > 0 ? "positive" : "negative",
    },
  ];
  return stats;
}
type Metrics = ReturnType<typeof generateMetrics>;
type BudgetStats = {
  name: string;
  changeType: "positive" | "negative";
  change: string;
  value: string;
};
const BudgetStatsWidget = ({ stats }: { stats: BudgetStats[] }) => {
  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">
            {stat.name}
          </dt>
          <dd
            className={classNames(
              stat.changeType === "negative"
                ? "text-rose-600"
                : "text-emerald-700",
              "text-xs font-medium"
            )}
          >
            {stat.change}
          </dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
export default BudgetBreakdown;
