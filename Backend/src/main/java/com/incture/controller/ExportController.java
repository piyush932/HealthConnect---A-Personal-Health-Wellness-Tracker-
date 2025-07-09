package com.incture.controller;

import com.incture.entity.*;
import com.incture.repository.*;
import com.incture.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.io.PrintWriter;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/export")
public class ExportController {

    @Autowired private SleepRecordRepository sleepRepo;
    @Autowired private WaterIntakeRepository waterRepo;
    @Autowired private MoodEntryRepository moodRepo;
    @Autowired private DailyActivityRepository activityRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private JwtUtil jwtUtil;

    @GetMapping("/all")
    public void exportAllData(@RequestHeader("Authorization") String token, HttpServletResponse response) throws Exception {
        String email = jwtUtil.extractUsername(token.substring(7));
        User user = userRepo.findByEmail(email).orElseThrow();

        // Setup response
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"health_data.csv\"");

        PrintWriter writer = response.getWriter();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // SLEEP
        writer.println("Sleep Records");
        writer.println("Date,Start Time,End Time,Hours,Rating,Notes");
        for (SleepRecord s : sleepRepo.findByUser(user)) {
            writer.printf("%s,%s,%s,%.2f,%d,%s%n",
                    s.getSleepDate(), s.getSleepStartTime(), s.getSleepEndTime(),
                    s.getSleepHours(), s.getQualityRating(), s.getNotes());
        }

        // WATER
        writer.println("\nWater Intake");
        writer.println("Date,Amount (liters)");
        for (WaterIntake w : waterRepo.findByUser(user)) {
            writer.printf("%s,%.2f%n", w.getIntakeDate(), w.getAmountInLiters());
        }

        // MOOD
        writer.println("\nMood Entries");
        writer.println("Date,Mood Rating,Notes");
        for (MoodEntry m : moodRepo.findByUser(user)) {
            writer.printf("%s,%d,%s%n", m.getEntryDate(), m.getMoodRating(), m.getNotes());
        }

        // ACTIVITY
        writer.println("\nDaily Activities");
        writer.println("Date,Steps,Calories,Workout Type,Duration (mins)");
        for (DailyActivity a : activityRepo.findByUser(user)) {
            writer.printf("%s,%d,%d,%s,%d%n",
                    a.getActivityDate(), a.getStepsTaken(), a.getCaloriesBurned(),
                    a.getWorkoutType(), a.getDurationMinutes());
        }

        writer.flush();
        writer.close();
    }
}
