import React, { useMemo } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type TargetProgressChartProps = {
  current: number; // current progress (e.g., completed orders)
  target: number; // target value (e.g., daily target)
  title?: string;
};

export default function OrderTargetProgressChart({
  current,
  target,
  title = 'Daily Order Target',
}: TargetProgressChartProps) {
  const percent = Math.min((current / target) * 100, 100);

  const data: ChartData<'doughnut', number[], string> = useMemo(
    () => ({
      labels: ['Completed', 'Remaining'],
      datasets: [
        {
          data: [current, Math.max(target - current, 0)],
          backgroundColor: [
            'rgb(254, 93, 38)', // green
            'rgba(229,231,235,0.7)', // gray
          ],
          borderWidth: 0,
          borderRadius: 20,
          spacing: 4,
          cutout: '75%',
        },
      ],
    }),
    [current, target],
  );

  const options: ChartOptions<'doughnut'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: title,
          font: { size: 18, weight: 'bold' },
          padding: { top: 6, bottom: 12 },
        },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed;
              return `${label}: ${value}`;
            },
          },
        },
      },
    }),
    [title],
  );

  return (
    <div className="max-[500px] p-3 md:p-5 glass">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        Monthly Target
      </Typography>
      <div className="lg:h-[400px] max-w-[300px] lg:max-w-full ">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
            {percent.toFixed(0)}%
          </span>
          <span className="mt-1 text-sm font-medium text-gray-600 tracking-wide">
            {current} / {target}
          </span>
        </div>
      </div>
    </div>
  );
}
