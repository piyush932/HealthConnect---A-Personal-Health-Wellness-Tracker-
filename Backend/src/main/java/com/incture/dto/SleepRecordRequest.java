package com.incture.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class SleepRecordRequest {

    private LocalDate sleepDate;
    private LocalTime sleepStartTime;
    private LocalTime sleepEndTime;
    private int qualityRating;
    private String notes;

    // Getters and setters

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
}
