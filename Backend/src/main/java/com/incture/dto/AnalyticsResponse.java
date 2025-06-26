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
        public Double sleepHours;      // changed from double
        public Integer qualityRating;  // changed from int

        public SleepSummary(LocalDate date, Double sleepHours, Integer qualityRating) {
            this.date = date;
            this.sleepHours = sleepHours;
            this.qualityRating = qualityRating;
        }

        public LocalDate getDate() {
            return date;
        }

        public Double getSleepHours() {
            return sleepHours;
        }

        public Integer getQualityRating() {
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
