'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';

// Register required chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Sample data
const transactionStatusData = [
  { name: 'Success', value: 350 },
  { name: 'Pending', value: 50 },
  { name: 'Failed', value: 30 },
  { name: 'Refunded', value: 10 },
];

function TransactionStatusBreakdownChart() {
  const chartData = {
    labels: transactionStatusData.map(item => item.name),
    datasets: [
      {
        label: 'Transactions',
        data: transactionStatusData.map(item => item.value),
        backgroundColor: [
          '#4CAF50', // Success - green
          '#FFC107', // Pending - amber
          '#F44336', // Failed - red
          '#2196F3', // Refunded - blue
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 18,
          boxWidth: 18,
          boxHeight: 18,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const total = transactionStatusData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="glass p-4 sm:p-6 md:p-8">
      <DashboardSectionHeading title="Transaction Status Breakdown" />

      <div className="flex justify-center mt-4">
        <div className="max-w-[300px] md:max-w-[400px] lg:h-[400px] flex justify-center">
          <Pie data={chartData} options={chartOptions as any} />
        </div>
      </div>
    </div>
  );
}

export default TransactionStatusBreakdownChart;
