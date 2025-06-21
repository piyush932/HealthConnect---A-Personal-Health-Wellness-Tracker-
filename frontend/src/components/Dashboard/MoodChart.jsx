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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Moods to track
const MOODS = ['happy', 'sad', 'anxious', 'energetic', 'calm'];
const COLORS = {
  happy: '#4ade80',
  sad: '#f87171',
  anxious: '#facc15',
  energetic: '#60a5fa',
  calm: '#a78bfa'
};

function MoodChart({ width = '', marginTop = '', marginLR = '' }) {
  const [chartData, setChartData] = useState(null);

  // Generate dummy mood data for each day in the current month
  const generateMoodData = () => {
    const daysInMonth = moment().daysInMonth();
    const dailyData = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment().date(i).format('YYYY-MM-DD');
      const entry = { date };

      MOODS.forEach((mood) => {
        entry[mood] = Math.floor(Math.random() * 5) + 1; // 1–5 scale
      });

      dailyData.push(entry);
    }

    return dailyData;
  };

  useEffect(() => {
    const moodData = generateMoodData();
    const labels = moodData.map((entry) => moment(entry.date).format('D MMM'));

    const datasets = MOODS.map((mood) => ({
      label: mood.charAt(0).toUpperCase() + mood.slice(1),
      data: moodData.map((entry) => entry[mood]),
      borderColor: COLORS[mood],
      backgroundColor: COLORS[mood],
      tension: 0.3,
      fill: false,
      pointRadius: 3
    }));

    setChartData({ labels, datasets });
  }, []);

  return (
    <div className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Mood Trends (This Month)</h2>
      <div className="h-[400px] w-full min-w-[700px]">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 5,
                  ticks: { stepSize: 1 },
                  title: {
                    display: true,
                    text: 'Mood Intensity'
                  }
                }
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-2xl font-bold text-gray-400 text-center">No mood data available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoodChart;
