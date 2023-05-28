import React from "react";
import { FinancialTransaction } from "@/types";
import BarChart from "@/app/(pages)/wallet/[id]/components/barChart";
import { ChartData, ChartOptions } from "chart.js";
import dayjs from "dayjs";
import {classNames, formatNumberAsCurrency, formatNumberAsPercentage} from "@/lib/utils";

const BudgetBreakdown = ({
  transactions,
  budget,
}: {
  transactions: FinancialTransaction[];
  budget: number;
}) => {
  function barChartConfiguration(): ChartData<"bar", number[], unknown> {
    const transactionsByMonth = getTransactionsGroupedByMonth({ transactions });
    const labels = Array.from({ length: dayjs().month() + 1 }, (_, i) =>
      dayjs().month(i).format("MMM")
    );
    const expenses = labels.map((_, index) =>
      transactionsByMonth[index] ? transactionsByMonth[index]["total_cost"] : 0
    );

    const budgetBreakdown = labels.map((_, index) => budget / labels.length);
    const datasets = [
      {
        label: "Total Expense",
        data: expenses,
        backgroundColor: "hsl(352.6,95.7%,81.8%)",
      },
      {
        label: "Budget",
        data: budgetBreakdown,
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
    generateMetrics({ transactions, budget})
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
  budget,
}: {
  transactions: FinancialTransaction[];
  budget: number;
}) {
  const totalExpense = transactions
    .map((t) => t.amount! as number)
    .reduce((acc, value) => value + acc, 0);
  // get the total expenses for the month before and subtract from the current month
  // get the current month index
  const totalBudget = budget;
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
  if(lastTwoTotals.length < 2) {
    return {
        totalVariance,
        totalVariancePercentageString,
        totalVarianceString,
        totalExpenseString,
        totalBudgetString,
        lastTwoTotalsVariance: 0,
        lastTwoTotalsVarianceString: formatNumberAsCurrency(0),
    }
  }
  const lastTwoTotalsVariance =
    lastTwoTotals[1]["total_cost"] - lastTwoTotals[0]["total_cost"];
  const lastTwoTotalsVarianceString = formatNumberAsCurrency(lastTwoTotalsVariance);
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
      changeFormat: "currency",
      valueFormat: "currency",
      changeType: lastTwoTotalsVariance > 0 ? "negative" : "positive",
    },
    {
      name: "Total Budget",
      value: totalBudgetString,
      change: "",
      valueFormat: "currency",
      changeFormat: "currency",
      changeType: "positive",
    },
    {
      name: "Total Variance",
      value: totalVarianceString,
      change: totalVariancePercentageString,
      changeFormat: "percentage",
      valueFormat: "currency",
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
  changeFormat: "currency" | "percentage" | "number";
  value: string;
  valueFormat: "currency" | "percentage" | "number";
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
            {stat && stat.change && <StatWidget value={stat.change} duration={700} type={stat.changeFormat}/> }
          </dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            <StatWidget value={stat.value} duration={700} type={stat.valueFormat}/>
          </dd>
        </div>
      ))}
    </dl>
  );
};
type StatWidget = {
  value: number | string;
  duration: number;
  type: "currency" | "number" | "percentage";
}
const StatWidget = ({ value, duration, type }: StatWidget) => {
  const [displayValue, setDisplayValue] = React.useState<number|string>(0);
  const [animationStart, setAnimationStart] = React.useState(false);
  const valueAsNumber = convertToNumber(value);

  React.useEffect(() => {
    setAnimationStart(true)
  }, []);

  function setDisplayValueFromType(tempDisplayValue: number, type: "currency" | "number" | "percentage") {
    if (type === "currency") {
      setDisplayValue(formatNumberAsCurrency(tempDisplayValue));
    } else if (type === "number") {
      setDisplayValue(tempDisplayValue);
    } else if (type === "percentage") {
      setDisplayValue(formatNumberAsPercentage(tempDisplayValue));
    }
  }

  React.useEffect(() => {
    const animateCounter = () => {
    const startTime = Date.now();
    const updateValue = () => {
      const elapsedTime = Date.now() - startTime;
      const rawProgress = elapsedTime / duration; // Calculate progress, max 1
      const progress = easeInOutCubic(rawProgress); // Apply easing
        setDisplayValueFromType(Math.floor(progress * valueAsNumber), type);
      if (rawProgress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValueFromType(valueAsNumber, type);
      }
    };
    requestAnimationFrame(updateValue);
  };
    if(animationStart) {
      animateCounter();
    }
  }, [animationStart, duration, type, valueAsNumber]);

  return (
      <span>{displayValue}</span>
  )
}
function convertToNumber(value: number | string) {
    if (typeof value === "string") {
        return Number(value.replace(/[^0-9.-]+/g, ""));
    }
    return value;
}
const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3);
};
const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default BudgetBreakdown;

