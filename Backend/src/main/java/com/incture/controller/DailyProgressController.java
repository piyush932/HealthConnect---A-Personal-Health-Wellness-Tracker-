package com.incture.controller;

import com.incture.dto.DailyProgressRequest;
import com.incture.dto.WeeklyProgressResponse;
import com.incture.entity.DailyProgress;
import com.incture.service.DailyProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/progress")
public class DailyProgressController {

    @Autowired
    private DailyProgressService service;

    @PostMapping
    public String saveProgress(
            @AuthenticationPrincipal UserDetails user,
            @RequestBody DailyProgressRequest request) {
        service.saveOrUpdateProgress(user.getUsername(), request);
        return "Progress saved successfully.";
    }

    @GetMapping
    public List<DailyProgress> getProgress(
            @AuthenticationPrincipal UserDetails user,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return service.getProgress(
                user.getUsername(),
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        );
    }

    @GetMapping(params = "type")
    public ResponseEntity<?> getProgressByType(
            @AuthenticationPrincipal UserDetails user,
            @RequestParam String type) {

        String email = user.getUsername();

        if ("daily".equalsIgnoreCase(type)) {
            try {
                DailyProgress daily = service.getProgressForDate(email, LocalDate.now());
                return ResponseEntity.ok(Map.of("daily", daily));
            } catch (RuntimeException e) {
                return ResponseEntity.ok(Map.of("message", "No daily progress found for today."));
            }
        }

        if ("weekly".equalsIgnoreCase(type)) {
            WeeklyProgressResponse weekly = service.getWeeklyProgressSummary(email, LocalDate.now().minusDays(6), LocalDate.now());

            DailyProgress daily = null;
            try {
                daily = service.getProgressForDate(email, LocalDate.now());
            } catch (RuntimeException e) {
                // Daily progress not found; skip it
            }

            // ✅ Use a mutable map to allow null values safely
            Map<String, Object> response = new HashMap<>();
            response.put("weekly", weekly);

            if (daily != null) {
                response.put("daily", daily);
            } else {
                response.put("message", "No daily progress found for today.");
            }

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Invalid type: " + type));
    }



}
