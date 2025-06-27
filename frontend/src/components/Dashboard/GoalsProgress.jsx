import React, { useState, useEffect } from 'react';
import { Target, Footprints, Clock } from 'lucide-react';
import axios from 'axios';

export default function GoalsProgress({ tittle = "n/a" }) {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/progress?type=${tittle === 'Weekly Goals' ? 'weekly' : 'daily'}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (tittle === 'Weekly Goals') {
          setWeeklyData(response.data.weekly);
          setDailyData(response.data.daily); // For target comparison
        } else {
          setDailyData(response.data.daily); // ✅ FIX: use .daily
        }
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [tittle]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{tittle}</h2>
      <div className="space-y-4">
        {tittle === "Daily Goals" && dailyData && (
          <>
            <GoalItem
              label="Calories Burned"
              icon={<Target className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData.caloriesBurned ?? 0}
              target={dailyData.outOfCaloriesBurned ?? 1}
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData.stepsTaken ?? 0}
              target={dailyData.targetSteps ?? 1}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData.spendWorkoutTime ?? 0}
              target={dailyData.outOfWorkoutTime ?? 1}
            />
          </>
        )}

        {tittle === "Weekly Goals" && weeklyData && dailyData && (
          <>
            <GoalItem
              label="Calories Burned"
              icon={<Target className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.caloriesBurned ?? 0}
              target={(dailyData.outOfCaloriesBurned ?? 1) * 7}
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.stepsTaken ?? 0}
              target={(dailyData.targetSteps ?? 1) * 7}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.spendWorkoutTime ?? weeklyData.spendWorkoutTimeMinutes ?? 0}
              target={(dailyData.outOfWorkoutTime ?? 1) * 7}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Goal item component
function GoalItem({ label, icon, progress, target }) {
  const percentage = target ? Math.min((progress / target) * 100, 100) : 0;

  return (
    <div className="flex items-center">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-600">{progress}/{target}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
