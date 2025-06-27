package com.incture.dto;

import java.time.LocalDate;

public class DailyProgressRequest {
    private LocalDate date;
    private int caloriesBurned;
    private int outOfCaloriesBurned;
    private int stepsTaken;
    private int targetSteps;
    private int spendWorkoutTime;
    private int outOfWorkoutTime;

    public LocalDate getDate() {
        return date;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public int getOutOfCaloriesBurned() {
        return outOfCaloriesBurned;
    }

    public int getStepsTaken() {
        return stepsTaken;
    }

    public int getTargetSteps() {
        return targetSteps;
    }

    public int getSpendWorkoutTime() {
        return spendWorkoutTime;
    }

    public int getOutOfWorkoutTime() {
        return outOfWorkoutTime;
    }

    // Add setters if needed (or use Lombok)

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public void setOutOfCaloriesBurned(int outOfCaloriesBurned) {
        this.outOfCaloriesBurned = outOfCaloriesBurned;
    }

    public void setStepsTaken(int stepsTaken) {
        this.stepsTaken = stepsTaken;
    }

    public void setTargetSteps(int targetSteps) {
        this.targetSteps = targetSteps;
    }

    public void setSpendWorkoutTime(int spendWorkoutTime) {
        this.spendWorkoutTime = spendWorkoutTime;
    }

    public void setOutOfWorkoutTime(int outOfWorkoutTime) {
        this.outOfWorkoutTime = outOfWorkoutTime;
    }
}
