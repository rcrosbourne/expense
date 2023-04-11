import { FinancialTransaction } from "@/app/types";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  ChartTypeRegistry,
  TooltipItem,
  Legend,
  Tooltip,
  ArcElement,
} from "chart.js";
import { formatNumberAsCurrency } from "@/app/utils";

ChartJS.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
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
function chartDataConfiguration(
  transactions: FinancialTransaction[]
): ChartData<"pie", number[], unknown> {
  const { totalIncome, totalExpense } =
    calculateTotalIncomeAndExpense(transactions);
  return {
    labels: ["Total Income", "Total Expense"],
    datasets: [
      {
        type: "pie" as const,
        data: [totalIncome.amount, totalExpense.amount],
        backgroundColor: ["hsla(175, 77%, 26%, 0.5)", "hsla(0, 91%, 71%, 0.5)"],
        borderColor: ["hsla(175, 77%, 26%, 1)", "hsla(0, 91%, 71%, 1)"],
        borderWidth: 2,
      },
    ],
  };
}
function calculateTotalIncomeAndExpense(transactions: FinancialTransaction[]) {
  const totalIncome = transactions.reduce(
    (acc, curr) => {
      if (curr.type === "income") {
        acc.amount += curr.amount;
        return acc;
      }
      return acc;
    },
    { amount: 0 }
  );
  const totalExpense = transactions.reduce(
    (acc, curr) => {
      if (curr.type === "expense") {
        acc.amount += curr.amount;
        return acc;
      }
      return acc;
    },
    { amount: 0 }
  );
  return { totalIncome, totalExpense };
}
const PieChart = ({
  transactions,
}: {
  transactions: FinancialTransaction[];
}) => {
  const [data, setData] = React.useState<ChartData<"pie", number[], unknown>>(
    chartDataConfiguration(transactions)
  );
  return (
    <div className="flex items-center justify-center md:min-h-[500px]">
      <Pie data={data} options={options} />
    </div>
  );
};
export default PieChart;
