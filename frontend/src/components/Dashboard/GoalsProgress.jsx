import React, { useState, useEffect } from 'react';
import { Target, Footprints, Clock } from 'lucide-react';
import axios from 'axios';

export default function GoalsProgress({ tittle = "n/a" }) {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/progress?type=${tittle === 'Weekly Goals' ? 'weekly' : 'daily'}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Check if there's a message from the backend
        if (response.data.message) {
          setErrorMsg(response.data.message);
        }

        // Safely assign data
        if (tittle === 'Weekly Goals') {
          setWeeklyData(response.data.weekly || null);
          setDailyData(response.data.daily || null);
        } else {
          setDailyData(response.data.daily || null);
        }

      } catch (error) {
        console.error("Failed to fetch progress data:", error);
        setErrorMsg("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [tittle]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (errorMsg && !weeklyData && !dailyData) {
    return <div className="text-red-500 font-medium">{errorMsg}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{tittle}</h2>
      <div className="space-y-4">

        {/* Daily Goals Rendering */}
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

        {/* Weekly Goals Rendering */}
        {tittle === "Weekly Goals" && weeklyData && (
          <>
            <GoalItem
              label="Calories Burned"
              icon={<Target className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.caloriesBurned ?? 0}
              target={(dailyData?.outOfCaloriesBurned ?? 1000) * 7}
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.stepsTaken ?? 0}
              target={(dailyData?.targetSteps ?? 5000) * 7}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.spendWorkoutTime ?? weeklyData.spendWorkoutTimeMinutes ?? 0}
              target={(dailyData?.outOfWorkoutTime ?? 30) * 7}
            />

            {!dailyData && (
              <p className="text-sm text-gray-500 italic">
                Daily targets not available. Using default weekly goals.
              </p>
            )}
          </>
        )}

        {/* Show only error if no data at all */}
        {!dailyData && !weeklyData && errorMsg && (
          <div className="text-gray-500">{errorMsg}</div>
        )}
      </div>
    </div>
  );
}

// Reusable Goal progress bar item
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
