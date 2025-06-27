package com.incture.controller;

import com.incture.dto.DailyProgressRequest;
import com.incture.dto.WeeklyProgressResponse;
import com.incture.entity.DailyProgress;
import com.incture.service.DailyProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public Map<String, Object> getProgressByType(
            @AuthenticationPrincipal UserDetails user,
            @RequestParam String type) {

        String email = user.getUsername();

        if ("daily".equalsIgnoreCase(type)) {
            DailyProgress daily = service.getProgressForDate(email, LocalDate.now());
            return Map.of("daily", daily);
        } else if ("weekly".equalsIgnoreCase(type)) {
            DailyProgress daily = service.getProgressForDate(email, LocalDate.now());
            WeeklyProgressResponse weekly = service.getWeeklyProgressSummary(email, LocalDate.now().minusDays(6), LocalDate.now());
            return Map.of(
                    "weekly", weekly,
                    "daily", daily  // so targets can be used for weekly progress bars
            );
        } else {
            throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

}
