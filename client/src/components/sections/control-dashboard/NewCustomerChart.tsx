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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const NewCustomerChart: React.FC = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#43cea2'); // top color
      gradient.addColorStop(1, '#185a9d'); // bottom color
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'New Customers',
        data: [12, 18, 25, 22, 30, 28, 35, 40, 33, 26, 20, 15],
        borderRadius: 10, // Rounded corners
        borderSkipped: false,
        hoverBackgroundColor: '#2b6777',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
        labels: {
          color: '#444',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
      },
      title: {
        display: false,
        text: 'Monthly New Customers',
        color: '#222',
        font: {
          size: 20,
          weight: 'bold',
        },
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
          color: '#eee',
          display: false,
        },
      },
    },
  };

  return (
    <div className=" p-3  md:p-5 glass max-h-[600px]">
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        New Customers
      </Typography>

      <div className="lg:h-[400px] max-w-[300px] lg:max-w-full ">
        <Bar ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
};

export default NewCustomerChart;
