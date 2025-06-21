import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import moment from 'moment';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SleepTrackerChart({ width = '', marginTop = '', marginLR = '' }) {
  const [chartData, setChartData] = useState(null);

  const generateDummyData = () => {
    const daysInMonth = moment().daysInMonth();
    const labels = Array.from({ length: daysInMonth }, (_, i) =>
      moment().date(i + 1).format('D MMM')
    );

    const data = labels.map(() => (Math.random() * 4 + 4).toFixed(1)); // Random between 4 to 8 hours

    return { labels, data };
  };

  useEffect(() => {
    const { labels, data } = generateDummyData();
    setChartData({
      labels,
      datasets: [
        {
          label: 'Sleep Duration (hrs)',
          data,
          fill: false,
          borderColor: '#10b981', // Emerald Green
          backgroundColor: '#10b981',
          tension: 0.4,
          pointRadius: 3,
        }
      ]
    });
  }, []);

  return (
    <div className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Sleep Tracker (This Month)</h2>
      <div className="h-[400px] w-full min-w-[600px]">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Hours'
                  },
                  suggestedMax: 10
                }
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-2xl font-bold text-gray-400 text-center">
              No sleep data available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SleepTrackerChart;
