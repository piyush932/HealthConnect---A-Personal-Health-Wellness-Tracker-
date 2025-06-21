import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import moment from 'moment';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WaterIntakeChart({ width = '', marginTop = '', marginLR = '' }) {
  const [chartData, setChartData] = useState(null);

  const generateDummyData = () => {
    const daysInMonth = moment().daysInMonth();
    const labels = Array.from({ length: daysInMonth }, (_, i) =>
      moment().date(i + 1).format('D MMM')
    );

    const data = labels.map(() => Math.floor(Math.random() * 5) + 1); // 1 to 5 liters

    return { labels, data };
  };

  useEffect(() => {
    const { labels, data } = generateDummyData();
    setChartData({
      labels,
      datasets: [
        {
          label: 'Water Intake (L)',
          data,
          backgroundColor: '#0ea5e9'
        }
      ]
    });
  }, []);

  return (
    <div className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Water Intake (This Month)</h2>
      <div className="h-[400px] w-full min-w-[600px]">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Liters'
                  }
                }
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-2xl font-bold text-gray-400 text-center">
              No data available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WaterIntakeChart;
