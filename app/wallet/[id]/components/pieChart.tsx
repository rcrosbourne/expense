import { FinancialTransaction } from "@/app/types";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
  ArcElement,
} from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = ({dataFunction, options}: {
  dataFunction: () => ChartData<"pie", number[], unknown>,
  options?: ChartOptions<"pie">
}) => {
  // const [data, setData] = React.useState<ChartData<"pie", number[], unknown>>(
  //   chartDataConfiguration(transactions)
  // );
  return (
      <div className="flex items-center justify-center md:min-h-[500px]">
        <Pie data={dataFunction()} options={options}/>
      </div>
  );
};
export default PieChart;
