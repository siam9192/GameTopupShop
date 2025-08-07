'use client';
// BarChart.tsx
import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';

// ✅ Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // for background gradient
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RevenueChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(67, 206, 162, 0.6)');
      gradient.addColorStop(1, 'rgba(24, 90, 157, 0.1)');
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Customer Growth',
        data: [12, 18, 25, 22, 30, 28, 35, 40, 33, 26, 20, 15],
        fill: true,
        borderColor: '#2b6777',
        pointBackgroundColor: '#2b6777',
        tension: 0.4, // Smooth curve
        borderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#444',
          font: { size: 14 },
        },
      },

      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#444',
        borderColor: '#ccc',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#555',
        },
        grid: {
          display: false,
          color: '#eee',
        },
      },
    },
  };

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
        Last 12 Month Revenues
      </Typography>

      <div className="lg:h-[400px] max-w-[300px] lg:max-w-full ">
        <Line ref={chartRef} height={'300px'} data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
