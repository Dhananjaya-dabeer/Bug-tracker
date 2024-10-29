import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);
interface ChartProps {
    labels: string[],
    data: number[]
}
export const LineChart = ({ labels, data } : ChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Concurrent Tasks',
        data,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
        y: {
            min: 0, // Ensures Y-axis starts at 0
            beginAtZero: true, // Another way to ensure starting at zero
        },
    },
};

  return <Line data={chartData} options={options} width={6} height={1} />;
};
