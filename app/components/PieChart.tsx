import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    data: {
        labels: string[];
        counts: number[];
    },
    typeCheck: string
}

const PieChart: React.FC<PieChartProps> = ({ data, typeCheck }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Task Priority',
                data: data.counts,
                backgroundColor:
                 typeCheck === 'priority' ?  
                 [
                    'rgba(255, 99, 132, 0.6)', // High
                    'rgba(255, 159, 64, 0.6)', // Medium
                    'rgba(75, 192, 192, 0.6)', // Low
                 ] : 
                 [
                    'rgba(255, 99, 132, 0.6)', // BACKLOG
                    'rgba(255, 159, 64, 0.6)', // IN_PROGRESS
                    'rgba(75, 192, 192, 0.6)', // REVIEW
                    'rgba(54, 162, 235, 0.6)' // COMPLETED
                 ]
                ,
                hoverOffset: 4,
            },
        ],
    };
    const options = {
        responsive: true,
        // maintainAspectRatio: false, // Prevent maintaining aspect ratio
    };

    return (
        <div className='h-72'>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;