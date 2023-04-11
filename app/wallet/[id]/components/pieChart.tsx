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
        backgroundColor.push(`${category.backgroundColorAsHsl!.replace(")", ", 80%)").replace("hsl", "hsla")}`);
        borderColor.push(category.backgroundColorAsHsl!);
      } else {
        data[index] += transaction.amount;
      }
    }
  });
  return { labels, data, backgroundColor, borderColor };
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
