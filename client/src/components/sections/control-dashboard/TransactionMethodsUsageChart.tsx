'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';

ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ Sample grouped data
const manualPaymentData = [
  { name: 'bKash', value: 7523 },
  { name: 'Nagad', value: 24500 },
  { name: 'Rocket', value: 8600 },
  { name: 'Upay', value: 4500 },
];

const livePaymentData = [
  { name: 'PayPal', value: 24467 },
  { name: 'Stripe', value: 12500 },
  { name: 'Visa', value: 10800 },
  { name: 'MasterCard', value: 9700 },
];

function TransactionsMethodsUsageChart() {
  const createChartData = (data: typeof manualPaymentData) => ({
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Amount',
        data: data.map(item => item.value),
        backgroundColor: [
          '#4CAF50', // Green
          '#2196F3', // Blue
          '#FFC107', // Amber
          '#F44336', // Red
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 13,
            weight: 'bold',
          },
          padding: 18,
          boxWidth: 16,
          boxHeight: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${context.label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="glass p-4 sm:p-6 md:p-8 max-h-[500px]">
      <DashboardSectionHeading title="Payment Methods Usage" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Manual Payment Methods */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-secondary mb-3">Manual</h3>
          <div className="max-w-[300px] md:max-w-[400px] lg:h-[350px] flex justify-center">
            <Pie data={createChartData(manualPaymentData)} options={chartOptions as any} />
          </div>
        </div>

        {/* Live Payment Methods */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-secondary mb-3">Live</h3>
          <div className="max-w-[300px] md:max-w-[400px] lg:h-[350px] flex justify-center">
            <Pie data={createChartData(livePaymentData)} options={chartOptions as any} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsMethodsUsageChart;
