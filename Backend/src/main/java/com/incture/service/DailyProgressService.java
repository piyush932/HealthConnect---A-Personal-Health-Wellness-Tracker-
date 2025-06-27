package com.incture.service;

import com.incture.dto.DailyProgressRequest;
import com.incture.dto.WeeklyProgressResponse;
import com.incture.entity.DailyProgress;
import com.incture.entity.User;
import com.incture.repository.DailyProgressRepository;
import com.incture.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyProgressService {

    @Autowired
    private DailyProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveOrUpdateProgress(String email, DailyProgressRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found with email: " + email));

        DailyProgress progress = progressRepository.findByUserAndDate(user, request.getDate())
                .orElse(new DailyProgress());

        progress.setUser(user);
        progress.setDate(request.getDate());
        progress.setCaloriesBurned(request.getCaloriesBurned());
        progress.setOutOfCaloriesBurned(request.getOutOfCaloriesBurned());
        progress.setStepsTaken(request.getStepsTaken());
        progress.setTargetSteps(request.getTargetSteps());
        progress.setSpendWorkoutTime(request.getSpendWorkoutTime());
        progress.setOutOfWorkoutTime(request.getOutOfWorkoutTime());

        progressRepository.save(progress);
    }

    public List<DailyProgress> getProgress(String email, LocalDate start, LocalDate end) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found with email: " + email));

        return progressRepository.findByUserAndDateBetween(user, start, end);
    }

    public DailyProgress getProgressForDate(String email, LocalDate date) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found with email: " + email));

        return progressRepository.findByUserAndDate(user, date)
                .orElseThrow(() -> new RuntimeException("No progress found for today"));
    }

    public WeeklyProgressResponse getWeeklyProgressSummary(String email, LocalDate start, LocalDate end) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found with email: " + email));

        List<DailyProgress> weekData = progressRepository.findByUserAndDateBetween(user, start, end);

        int totalCalories = 0, totalSteps = 0, totalWorkout = 0;
        for (DailyProgress d : weekData) {
            totalCalories += d.getCaloriesBurned();
            totalSteps += d.getStepsTaken();
            totalWorkout += d.getSpendWorkoutTime();
        }

        WeeklyProgressResponse response = new WeeklyProgressResponse();
        response.setCaloriesBurned(totalCalories);
        response.setStepsTaken(totalSteps);
        response.setSpendWorkoutTimeMinutes(totalWorkout);

        return response;
    }
}
