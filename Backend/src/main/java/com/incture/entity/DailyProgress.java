package com.incture.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "daily_progress")
public class DailyProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private int caloriesBurned;
    private int outOfCaloriesBurned;

    private int stepsTaken;
    private int targetSteps;

    private int spendWorkoutTime;
    private int outOfWorkoutTime;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public int getOutOfCaloriesBurned() {
        return outOfCaloriesBurned;
    }

    public void setOutOfCaloriesBurned(int outOfCaloriesBurned) {
        this.outOfCaloriesBurned = outOfCaloriesBurned;
    }

    public int getStepsTaken() {
        return stepsTaken;
    }

    public void setStepsTaken(int stepsTaken) {
        this.stepsTaken = stepsTaken;
    }

    public int getTargetSteps() {
        return targetSteps;
    }

    public void setTargetSteps(int targetSteps) {
        this.targetSteps = targetSteps;
    }

    public int getSpendWorkoutTime() {
        return spendWorkoutTime;
    }

    public void setSpendWorkoutTime(int spendWorkoutTime) {
        this.spendWorkoutTime = spendWorkoutTime;
    }

    public int getOutOfWorkoutTime() {
        return outOfWorkoutTime;
    }

    public void setOutOfWorkoutTime(int outOfWorkoutTime) {
        this.outOfWorkoutTime = outOfWorkoutTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
