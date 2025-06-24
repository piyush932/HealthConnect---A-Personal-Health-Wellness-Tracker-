package com.incture.dto;

import java.time.LocalDate;

public class MoodEntryRequest {
    private LocalDate entryDate;
    private int moodRating;
    private String notes;

    public LocalDate getEntryDate() { return entryDate; }
    public void setEntryDate(LocalDate entryDate) { this.entryDate = entryDate; }

    public int getMoodRating() { return moodRating; }
    public void setMoodRating(int moodRating) { this.moodRating = moodRating; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
