import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Plugin,
} from "chart.js";
import { formatNumberAsCurrency } from "@/app/utils";
const totalStackedBarPlugin: Plugin = {
  id: "totalStackedBarPlugin",
  afterDatasetsDraw: function (chart, _, options) {
    const ctx = chart.ctx;

    if (!ctx || !options) return;

    const fontStyle = options.fontStyle || "normal";
    const fontSize = options.fontSize || 12;
    const fontFamily = options.fontFamily || "Arial";
    const fontColor = options.fontColor || "#000";
    const textAlign = options.textAlign || "center";
    const textBaseline = options.textBaseline || "middle";

    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = textAlign as CanvasTextAlign;
    ctx.textBaseline = textBaseline as CanvasTextBaseline;

    const datasets = chart.data.datasets;
    const stacks: Record<number, number> = {};

    // Calculate the total for each stack based on visible datasets
    chart.getSortedVisibleDatasetMetas().forEach((meta) => {
      if (meta.type === "bar" && meta.data.length > 0) {
        const dataset = datasets[meta.index];
        dataset.data.forEach((value, index) => {
          if (!stacks[index]) {
            stacks[index] = 0;
          }
          stacks[index] += value as number;
        });
      }
    });

    // Get the last visible dataset
    const visibleDatasetMetas = chart.getSortedVisibleDatasetMetas();
    const lastVisibleDatasetMeta =
      visibleDatasetMetas[visibleDatasetMetas.length - 1];

    // Draw the total value above the last stack
    if (
      lastVisibleDatasetMeta?.type === "bar" &&
      lastVisibleDatasetMeta.data.length > 0
    ) {
      const bars = lastVisibleDatasetMeta.data;
      bars.forEach((bar, index) => {
        const total = stacks[index];
        const x = bar.x;
        const y = bar.y;
        if (x !== undefined && y !== undefined && total > 0) {
          ctx.fillText(
            "$" + formatNumberAsCurrency(total.toString()),
            x,
            y - 5
          );
        }
      });
    }
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = ({
  dataFunction,
  options,
}: {
  dataFunction: () => ChartData<"bar", number[], unknown>;
  options?: ChartOptions<"bar">;
}) => {
  return (
    <div className="flex items-center justify-center md:min-h-[500px]">
      <Bar
        data={dataFunction()}
        options={options}
        plugins={[totalStackedBarPlugin]}
      />
    </div>
  );
};
export default BarChart;
