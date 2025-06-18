import React from "react";
import DailyGoals from "../components/DailyGoals";

function Progress() {
  return (
    <div>
      <DailyGoals
        tittle="Daily Goals"
        burnedCalories="300"
        TargetCalories="500"
        currentSteps="250"
        TotalSteps="600"
        spendWorkout="45"
        workoutTime="60"
      />
    </div>
  );
}

export default Progress;
