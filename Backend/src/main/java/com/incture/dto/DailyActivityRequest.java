package com.incture.dto;

import java.time.LocalDate;

public class DailyActivityRequest {
    private int stepsTaken;
    private int caloriesBurned;
    private String workoutType;
    private int durationMinutes;
    private LocalDate activityDate;

    // Getters, Setters


    public int getStepsTaken() {
        return stepsTaken;
    }

    public void setStepsTaken(int stepsTaken) {
        this.stepsTaken = stepsTaken;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public String getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(String workoutType) {
        this.workoutType = workoutType;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    @Override
    public String toString() {
        return "DailyActivityRequest{" +
                "stepsTaken=" + stepsTaken +
                ", caloriesBurned=" + caloriesBurned +
                ", workoutType='" + workoutType + '\'' +
                ", durationMinutes=" + durationMinutes +
                ", activityDate=" + activityDate +
                '}';
    }
}
