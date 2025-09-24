'use client';
// RevenueOrderChart.tsx
import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Typography, useTheme } from '@mui/material';
import { EThemeMode } from '@/types';

// ✅ Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // for background gradients
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RevenueOrderChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  const theme = useTheme();

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;

      // Gradient for Revenue
      const revenueGradient = ctx.createLinearGradient(0, 0, 0, 400);
      revenueGradient.addColorStop(0, 'rgba(34,197,94,0.6)'); // green
      revenueGradient.addColorStop(1, 'rgba(34,197,94,0.05)');

      // Gradient for Orders
      const ordersGradient = ctx.createLinearGradient(0, 0, 0, 400);
      ordersGradient.addColorStop(0, 'rgba(59,130,246,0.6)'); // blue
      ordersGradient.addColorStop(1, 'rgba(59,130,246,0.05)');

      chart.data.datasets[0].backgroundColor = revenueGradient;
      chart.data.datasets[1].backgroundColor = ordersGradient;
      chart.update();
    }
  }, []);

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [12300, 19020, 30001, 25002, 3200, 40200, 3800, 42020, 4620, 5000, 42800, 53200],
        fill: false,
        borderColor: '#22c55e',
        pointBackgroundColor: '#22c55e',
        tension: 0.4,
        borderWidth: 3,

        borderDash: [5, 5], // solid line
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Orders',
        data: [12004, 1900, 30600, 25008, 38200, 4000, 38800, 42800, 4600, 50080, 48008, 53800],
        fill: false, // no fill for contrast
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        tension: 0.3,
        borderWidth: 2,
        borderDash: [5, 5], // dashed line
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        left: 0,
        right: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // top, bottom, left, right
        align: 'center', // align items left, center, right
        labels: {
          color: '#444',
          font: { size: 14 },
          boxWidth: 20, // width of color box
          boxHeight: 20, // height of color box
          padding: 10, // space between items

          usePointStyle: true, // use rounded point instead of box
          pointStyle: 'circle', // circle, rect, triangle, etc.
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#444',
        borderColor: '#cccc',
        borderWidth: 1,
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: '#555' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#555' },
        grid: { color: theme.palette.mode === EThemeMode.LIGHT ? '#eee' : '#555' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-h-[500px] p-3 md:p-5 glass">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        Revenue & Orders Analytics
      </Typography>

      <div className="lg:h-[400px] max-w-[300px] lg:max-w-full">
        <Line ref={chartRef} height={'300px'} data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueOrderChart;
