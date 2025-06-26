package com.incture.service;

import com.incture.dto.AnalyticsResponse;
import com.incture.entity.User;
import com.incture.repository.MoodEntryRepository;
import com.incture.repository.SleepRecordRepository;
import com.incture.repository.UserRepository;
import com.incture.repository.WaterIntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private WaterIntakeRepository waterRepo;

    @Autowired
    private SleepRecordRepository sleepRepo;

    @Autowired
    private MoodEntryRepository moodRepo;

    @Autowired
    private UserRepository userRepo;

    public List<AnalyticsResponse.WaterIntakeStats> getWaterIntakeStats(Long userId, int month, int year) {
        return waterRepo.findMonthlyWaterIntake(userId, month, year);
    }

    public List<AnalyticsResponse.SleepSummary> getSleepSummary(Long userId, int month, int year) {
        return sleepRepo.findMonthlySleepSummary(userId, month, year);
    }

    public List<AnalyticsResponse.MoodStats> getMoodStats(Long userId, int month, int year) {
        return moodRepo.findMonthlyMoodStats(userId, month, year);
    }

    // ✅ New methods using email
    public List<AnalyticsResponse.WaterIntakeStats> getWaterIntakeStatsByEmail(String email, int month, int year) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return getWaterIntakeStats(user.getId(), month, year);
    }

    public List<AnalyticsResponse.SleepSummary> getSleepSummaryByEmail(String email, int month, int year) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return getSleepSummary(user.getId(), month, year);
    }

    public List<AnalyticsResponse.MoodStats> getMoodStatsByEmail(String email, int month, int year) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return getMoodStats(user.getId(), month, year);
    }
}
