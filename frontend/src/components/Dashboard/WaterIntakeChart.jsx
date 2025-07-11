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

function WaterIntakeChart({ width = '', marginTop = '', marginLR = '' }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);


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

  const fetchData = async () => {
    const currentYear = new Date().getFullYear();
    const monthNum = monthMap[selectedMonth];
    const queryMonth = `${currentYear}-${monthNum}`;

    setLoading(true);
    setChartData(null);

    try {
      const res = await axios.get(`http://localhost:8080/analytics/water-intake?month=${queryMonth}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const responseData = res.data;

      const daysInMonth = moment(queryMonth, 'YYYY-MM').daysInMonth();
      const labels = Array.from({ length: daysInMonth }, (_, i) =>
        moment(`${queryMonth}-${String(i + 1).padStart(2, '0')}`).format('D MMM')
      );

      const dataMap = {};
      responseData.forEach(entry => {
        const formattedDate = moment(entry.date).format('D MMM');
        dataMap[formattedDate] = entry.waterLiters;
      });

      const data = labels.map(label => dataMap[label] || 0);

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
    } catch (err) {
      console.error('Error fetching water intake data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Water Intake ({selectedMonth})</h2>
        <select
          className="p-2 border rounded-md"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Object.keys(monthMap).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="h-[400px] w-full min-w-[600px]">
        {loading ? (
          <Loader />
        ) : chartData ? (
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
