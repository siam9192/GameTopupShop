'use client'
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import DashboardSectionHeading from "@/components/ui/DashboardSectionHeading";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const transactionsData = [
  { name: "Transactions", value: 7523 },
  { name: "Total Revenue", value: 245000 },
  { name: "Pending Transactions", value: 24467 },
  { name: "Failed Transactions", value: 12 },
];

 function TransactionsMethodsUsageChart() {
  const chartData = {
    labels: transactionsData.map((item) => item.name),
    datasets: [
      {
        label: "Amount",
        data: transactionsData.map((item) => item.value),
        backgroundColor: [
          "#4CAF50", // Green
          "#2196F3", // Blue
          "#FFC107", // Amber
          "#F44336", // Red
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
  legend: {
  position: "bottom",
  labels: {
    font: {
      size: 14,
      weight: "bold",
    },
   
    padding: 20, // spacing between items
    boxWidth: 18, // size of color box
    boxHeight: 18,
    usePointStyle: true, // makes legend box circular
    pointStyle: "circle", // could also be 'rectRounded'
  },
},
      tooltip: {
        callbacks: {
          label: (context:any) => {
            const value = context.raw;
            return `${context.label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (

        <div className="max-[500px] p-3 md:p-5 glass">
      <DashboardSectionHeading title="Methods Usage"/>

      <div className="lg:h-[400px] max-w-[300px] lg:max-w-full flex justify-center ">
      <Pie   data={chartData} options={chartOptions as any} />
      </div>
    </div>
  
  );
}

export default TransactionsMethodsUsageChart