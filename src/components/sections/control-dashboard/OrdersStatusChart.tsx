'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, Filler } from 'chart.js';
import { Typography, useTheme } from '@mui/material';
import { EThemeMode } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend, Title, Filler);

type SweetPieChartProps = {
  initialData?: ChartData<'pie', number[], string>;
  title?: string;
};

export default function OrdersStatusChart({ initialData, title = '' }: SweetPieChartProps) {
  const chartRef = useRef<any>(null);
  const [showPercent, setShowPercent] = useState(true);
  const [exploded, setExploded] = useState(false);
  const theme = useTheme();
  // fallback sample data
  const sample: ChartData<'pie', number[], string> = {
    labels: ['Chocolate', 'Strawberry', 'Vanilla', 'Matcha', 'Blueberry'],
    datasets: [
      {
        label: 'Slices',
        data: [35, 18, 25, 12, 10],
        // soft pastel palette
        backgroundColor: [
          'rgba(107, 99, 246, 0.9)', // indigo
          'rgba(255, 99, 132, 0.9)', // pink
          'rgba(255, 205, 86, 0.9)', // yellow
          'rgba(16, 185, 129, 0.9)', // emerald
          'rgba(99, 102, 241, 0.9)', // violet
        ],
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: theme.palette.mode === EThemeMode.DARK ? 0 : 3,
        hoverOffset: 8, // grows on hover
        spacing: 4, // creates gap between slices
        borderRadius: 12, // round slice edges
      },
    ],
  };
  const data: ChartData<'pie', number[], string> = initialData ?? sample;

  // options memoized for performance
  const options: ChartOptions<'pie'> = useMemo(
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
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 16,
            boxWidth: 12,
            font: {
              size: 14,
            },
          },
          onClick: (e, legendItem, legend) => {
            const index = legendItem.index;
            const ci = legend.chart;
            const meta = ci.getDatasetMeta(0);
            meta.data[index!].hidden = !meta.data[index!].hidden;
            ci.update();
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          padding: 10,
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const dataset = context.dataset.data as number[];
              const total = dataset.reduce((a, b) => a + b, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return showPercent ? `${label}: ${value} (${percent}%)` : `${label}: ${value}`;
            },
          },
        },
      },
      elements: {
        arc: {
          borderAlign: 'center',
        },
      },
      animation: {
        animateRotate: true,
        duration: 1000,
        easing: 'easeOutCubic',
      },
      onHover: (event, elements) => {
        if (event.native) {
          (event.native.target as HTMLElement).style.cursor = elements.length
            ? 'pointer'
            : 'default';
        }
      },
    }),
    [showPercent, title],
  );

  // create an "exploded" dataset offset if toggled
  const processedData: ChartData<'pie', number[], string> = useMemo(() => {
    if (!exploded) return data;
    const maxIndex = data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data));
    const copy = JSON.parse(JSON.stringify(data));
    (copy as any)._explodeIndex = maxIndex;
    return copy;
  }, [data, exploded]);

  // small plugin to implement per-slice offset (exploded effect)
  const explodePlugin = useMemo(
    () => ({
      id: 'explodePlugin',
      afterLayout: (chart: any) => {
        const meta = chart.getDatasetMeta(0);
        const dataObj = chart.config.data as any;
        const explodeIndex = dataObj._explodeIndex;
        if (explodeIndex == null) return;
        meta.data.forEach((arc: any, idx: number) => {
          if (idx === explodeIndex) {
            arc.options.offset = 12;
          } else {
            arc.options.offset = 0;
          }
        });
      },
    }),
    [],
  );

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
        Orders Percentage
      </Typography>
      <div className="lg:h-[400px] max-w-[300px] lg:max-w-full ">
        <Pie ref={chartRef} data={processedData} options={options} plugins={[explodePlugin]} />
      </div>
    </div>
  );
}
