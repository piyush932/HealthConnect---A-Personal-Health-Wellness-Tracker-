import React, { useState, useEffect } from 'react';
import { Target, Footprints, Clock } from 'lucide-react';

export default function GoalsProgress({ tittle = "n/a" }) {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching dummy data
  useEffect(() => {
    const dummyDaily = {
      caloriesBurned: 320,
      outOfCaloriesBurned: 500,
      stepsTaken: 4500,
      targetSteps: 8000,
      spendWorkoutTimeMinutes: 30,
      outOfWorkoutTimeMinutes: 60,
    };

    const dummyWeekly = {
      caloriesBurned: 2150,
      stepsTaken: 32000,
      spendWorkoutTimeMinutes: 180,
    };

    // Simulate async load
    setTimeout(() => {
      setDailyData(dummyDaily);
      if (tittle === 'Weekly Goals') {
        setWeeklyData(dummyWeekly);
      }
      setLoading(false);
    }, 1000);
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
              progress={dailyData.caloriesBurned}
              target={dailyData.outOfCaloriesBurned}
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData.stepsTaken}
              target={dailyData.targetSteps}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData.spendWorkoutTimeMinutes}
              target={dailyData.outOfWorkoutTimeMinutes}
            />
          </>
        )}

        {tittle === "Weekly Goals" && weeklyData && dailyData && (
          <>
            <GoalItem
              label="Calories Burned"
              icon={<Target className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.caloriesBurned}
              target={dailyData.outOfCaloriesBurned * 7}
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.stepsTaken}
              target={dailyData.targetSteps * 7}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={weeklyData.spendWorkoutTimeMinutes}
              target={dailyData.outOfWorkoutTimeMinutes * 7}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Progress bar for each goal
function GoalItem({ label, icon, progress, target }) {
  const percentage = target ? Math.min((progress / target) * 100, 100) : 0;

  return (
    <div className="flex items-center">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-600">
            {progress}/{target}
          </span>
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
