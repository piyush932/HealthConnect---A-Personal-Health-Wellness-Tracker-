import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [piChartData, setPiChartData] = useState(null);

  useEffect(() => {
    // Dummy percentage data simulating weekly progress
    const dummyData = {
      calories: 65,    // 65% of target
      steps: 80,       // 80% of target
      workoutTime: 45, // 45% of target
    };

    const chartData = {
      labels: ['Calories', 'Steps', 'Workout Time'],
      datasets: [
        {
          label: 'Progress Percentage',
          data: [dummyData.calories, dummyData.steps, dummyData.workoutTime],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        },
      ],
    };

    setPiChartData(chartData);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Progress</h2>
      {piChartData ? (
        <Doughnut data={piChartData} />
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-2xl font-bold text-gray-400 text-center">No weekly data available.</p>
        </div>
      )}
    </div>
  );
}

export default DoughnutChart;
