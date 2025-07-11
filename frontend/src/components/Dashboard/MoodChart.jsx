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
import axios from 'axios';
import Loader from '../Loader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mood Emoji Mapping
const moodMap = {
  1: { emoji: '😞', label: 'Very Sad' },
  2: { emoji: '😕', label: 'Sad' },
  3: { emoji: '😐', label: 'Neutral' },
  4: { emoji: '🙂', label: 'Happy' },
  5: { emoji: '😄', label: 'Very Happy' }
};

const monthMap = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12'
};

function MoodChart({ width = '', marginTop = '', marginLR = '' }) {
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMoodData = async () => {
    const year = new Date().getFullYear();
    const monthNumber = monthMap[selectedMonth];
    const queryMonth = `${year}-${monthNumber}`;

    setLoading(true);
    setChartData(null);

    try {
      const res = await axios.get(`http://localhost:8080/analytics/mood?month=${queryMonth}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const responseData = res.data; 

      const daysInMonth = moment(queryMonth, 'YYYY-MM').daysInMonth();
      const labels = Array.from({ length: daysInMonth }, (_, i) =>
        moment(`${queryMonth}-${String(i + 1).padStart(2, '0')}`).format('D MMM')
      );

      const moodMapByDate = {};
      responseData.forEach(entry => {
        const formattedDate = moment(entry.entryDate).format('D MMM');
        moodMapByDate[formattedDate] = entry.moodRating;
      });

      const moodRatings = labels.map(label => moodMapByDate[label] || null);
      const emojiPoints = moodRatings.map(rating => moodMap[rating]?.emoji || '');

      setChartData({
        labels,
        datasets: [
          {
            label: 'Mood Rating',
            data: moodRatings,
            borderColor: '#6366f1',
            backgroundColor: '#a5b4fc',
            tension: 0.3,
            pointRadius: 6,
            pointHoverRadius: 7,
            pointStyle: emojiPoints
          }
        ]
      });
    } catch (err) {
      console.error('Error fetching mood data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodData();
  }, [selectedMonth]);

  return (
    <div className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Mood Trends ({selectedMonth})</h2>
        <select
          className="border px-3 py-1 rounded-md text-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Object.keys(monthMap).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="h-[400px] w-full min-w-[700px]">
        {loading ? (
          <Loader />
        ) : chartData ? (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (ctx) {
                      const rating = ctx.raw;
                      const mood = moodMap[rating];
                      return `${mood?.emoji || ''} ${mood?.label} (${rating}/5)`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: 6,
                  ticks: {
                    stepSize: 1,
                    callback: function (value) {
                      return value >= 1 && value <= 5 ? `${value}` : '';
                    }
                  },
                  title: {
                    display: true,
                    text: 'Mood Rating (1–5)'
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
