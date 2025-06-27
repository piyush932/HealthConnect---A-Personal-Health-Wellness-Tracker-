package com.incture.dto;

public class WeeklyProgressResponse {
    private int caloriesBurned;
    private int stepsTaken;
    private int spendWorkoutTimeMinutes;

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public int getStepsTaken() {
        return stepsTaken;
    }

    public void setStepsTaken(int stepsTaken) {
        this.stepsTaken = stepsTaken;
    }

    public int getSpendWorkoutTimeMinutes() {
        return spendWorkoutTimeMinutes;
    }

    public void setSpendWorkoutTimeMinutes(int spendWorkoutTimeMinutes) {
        this.spendWorkoutTimeMinutes = spendWorkoutTimeMinutes;
    }
}
