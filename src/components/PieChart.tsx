import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

interface PieChartProps {
  pollOptions: { id:number; optionLabel: string; optionValue: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ pollOptions }) => {
  const getChartData = () => {
    const labels = pollOptions.map(option => option.optionLabel);
    const totalVotes = pollOptions.reduce((sum, option) => sum + option.optionValue, 0);
    const data = pollOptions.map(option => (option.optionValue / totalVotes) * 100);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ],
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw.toFixed(2);
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return <Pie data={getChartData()} options={options} />;
};

export default PieChart;