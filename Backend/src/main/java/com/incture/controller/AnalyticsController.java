package com.incture.controller;

import com.incture.dto.AnalyticsResponse;
import com.incture.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/water-intake")
    public List<AnalyticsResponse.WaterIntakeStats> getWaterIntakeAnalytics(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("month") String monthString) {
        LocalDate monthDate = LocalDate.parse(monthString + "-01");
        return analyticsService.getWaterIntakeStatsByEmail(userDetails.getUsername(), monthDate.getMonthValue(), monthDate.getYear());
    }

    @GetMapping("/sleep-summary")
    public List<AnalyticsResponse.SleepSummary> getSleepSummary(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("month") String monthString) {
        LocalDate monthDate = LocalDate.parse(monthString + "-01");
        return analyticsService.getSleepSummaryByEmail(userDetails.getUsername(), monthDate.getMonthValue(), monthDate.getYear());
    }

    @GetMapping("/mood")
    public List<AnalyticsResponse.MoodStats> getMoodStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("month") String monthString) {
        LocalDate monthDate = LocalDate.parse(monthString + "-01");
        return analyticsService.getMoodStatsByEmail(userDetails.getUsername(), monthDate.getMonthValue(), monthDate.getYear());
    }
}
