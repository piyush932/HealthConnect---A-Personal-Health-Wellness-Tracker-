package com.incture.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class DailyActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stepsTaken;
    private int caloriesBurned;
    private String workoutType;
    private int durationMinutes;
    private LocalDate activityDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors, Getters, Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public DailyActivity(Long id, int stepsTaken, int caloriesBurned, String workoutType, int durationMinutes, LocalDate activityDate, User user) {
        this.id = id;
        this.stepsTaken = stepsTaken;
        this.caloriesBurned = caloriesBurned;
        this.workoutType = workoutType;
        this.durationMinutes = durationMinutes;
        this.activityDate = activityDate;
        this.user = user;
    }

    public DailyActivity() {
    }
}
