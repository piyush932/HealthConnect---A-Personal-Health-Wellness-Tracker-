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
import axios from 'axios';
import Loader from '../Loader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sleep quality emoji map
const qualityMap = {
  1: { emoji: '😴', label: 'Very Poor' },
  2: { emoji: '😕', label: 'Poor' },
  3: { emoji: '😐', label: 'Average' },
  4: { emoji: '🙂', label: 'Good' },
  5: { emoji: '😄', label: 'Excellent' }
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

function SleepChart({ width = '', marginTop = '', marginLR = '' }) {
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSleepData = async () => {
    const year = new Date().getFullYear();
    const monthNum = monthMap[selectedMonth];
    const queryMonth = `${year}-${monthNum}`;

    setLoading(true);
    setChartData(null);

    try {
      const res = await axios.get(`http://localhost:8080/analytics/sleep-summary?month=${queryMonth}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const responseData = res.data; // [{ sleepDate, sleepHours, qualityRating }]

      const daysInMonth = moment(queryMonth, 'YYYY-MM').daysInMonth();
      const labels = Array.from({ length: daysInMonth }, (_, i) =>
        moment(`${queryMonth}-${String(i + 1).padStart(2, '0')}`).format('D MMM')
      );

      const hoursMap = {};
      const qualityMapByDate = {};
      responseData.forEach(entry => {
        const date = moment(entry.sleepDate).format('D MMM');
        hoursMap[date] = entry.sleepHours;
        qualityMapByDate[date] = entry.qualityRating;
      });

      const data = labels.map(label => hoursMap[label] || 0);
      const qualityData = labels.map(label => qualityMapByDate[label] || null);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Sleep Hours',
            data,
            backgroundColor: '#34d399'
          }
        ],
        meta: qualityData
      });
    } catch (err) {
      console.error('Error fetching sleep data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSleepData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Sleep Summary ({selectedMonth})</h2>
        <select
          className="p-2 border rounded-md"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Object.keys(monthMap).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="h-[400px] w-full min-w-[700px]">
        {loading ? (
          <Loader />
        ) : chartData ? (
          <Bar
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (ctx) {
                      const rating = chartData.meta?.[ctx.dataIndex];
                      const mood = qualityMap[rating];
                      const label = ctx.dataset.label || '';
                      return `${label}: ${ctx.raw} hrs\n${mood?.emoji || ''} ${mood?.label || 'No Rating'}`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Sleep Hours'
                  }
                }
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-2xl font-bold text-gray-400 text-center">No sleep data available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SleepChart;
