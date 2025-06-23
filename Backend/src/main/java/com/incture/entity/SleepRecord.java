package com.incture.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sleep_records")
public class SleepRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate sleepDate;

    private LocalTime sleepStartTime;
    private LocalTime sleepEndTime;

    private int qualityRating;  // rating 1-10

    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getSleepDate() {
        return sleepDate;
    }

    public void setSleepDate(LocalDate sleepDate) {
        this.sleepDate = sleepDate;
    }

    public LocalTime getSleepStartTime() {
        return sleepStartTime;
    }

    public void setSleepStartTime(LocalTime sleepStartTime) {
        this.sleepStartTime = sleepStartTime;
    }

    public LocalTime getSleepEndTime() {
        return sleepEndTime;
    }

    public void setSleepEndTime(LocalTime sleepEndTime) {
        this.sleepEndTime = sleepEndTime;
    }

    public int getQualityRating() {
        return qualityRating;
    }

    public void setQualityRating(int qualityRating) {
        this.qualityRating = qualityRating;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
