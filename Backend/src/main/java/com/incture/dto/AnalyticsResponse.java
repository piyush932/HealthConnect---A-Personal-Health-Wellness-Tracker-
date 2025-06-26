package com.incture.dto;

import java.time.LocalDate;

public class AnalyticsResponse {

    public static class WaterIntakeStats {
        public LocalDate date;
        public double waterLiters;

        public WaterIntakeStats(LocalDate date, double waterLiters) {
            this.date = date;
            this.waterLiters = waterLiters;
        }

        public LocalDate getDate() {
            return date;
        }

        public double getWaterLiters() {
            return waterLiters;
        }
    }

    public static class SleepSummary {
        public LocalDate date;
        public double sleepHours;
        public int qualityRating;

        public SleepSummary(LocalDate date, double sleepHours, int qualityRating) {
            this.date = date;
            this.sleepHours = sleepHours;
            this.qualityRating = qualityRating;
        }

        public LocalDate getDate() {
            return date;
        }

        public double getSleepHours() {
            return sleepHours;
        }

        public int getQualityRating() {
            return qualityRating;
        }
    }

    public static class MoodStats {
        public LocalDate entryDate;
        public int moodRating;

        public MoodStats(LocalDate entryDate, int moodRating) {
            this.entryDate = entryDate;
            this.moodRating = moodRating;
        }

        public LocalDate getEntryDate() {
            return entryDate;
        }

        public int getMoodRating() {
            return moodRating;
        }
    }
}
