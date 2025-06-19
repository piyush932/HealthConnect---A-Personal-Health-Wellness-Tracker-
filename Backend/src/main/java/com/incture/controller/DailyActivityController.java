package com.incture.controller;

import com.incture.dto.DailyActivityRequest;
import com.incture.entity.DailyActivity;
import com.incture.entity.User;
import com.incture.repository.UserRepository;
import com.incture.service.DailyActivityService;
import com.incture.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/activity")
public class DailyActivityController {

    private final DailyActivityService activityService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public DailyActivityController(DailyActivityService activityService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.activityService = activityService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // Helper method to extract User from token
    private User getCurrentUser(String token) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtUtil.extractUsername(jwt);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    // CREATE
    @PostMapping
    public DailyActivity createActivity(@RequestHeader("Authorization") String token,
                                        @RequestBody DailyActivityRequest request) {
        System.out.println(request.toString());
        User user = getCurrentUser(token);

        return activityService.createActivity(user, request);
    }

    // GET ALL ACTIVITIES FOR USER
    @GetMapping
    public List<DailyActivity> getActivities(@RequestHeader("Authorization") String token) {
        User user = getCurrentUser(token);
        return activityService.getActivities(user);
    }

    // GET ACTIVITIES BY DATE
    @GetMapping("/byDate")
    public List<DailyActivity> getActivitiesByDate(@RequestHeader("Authorization") String token,
                                                   @RequestParam("date") String dateString) {
        User user = getCurrentUser(token);
        LocalDate date = LocalDate.parse(dateString);
        return activityService.getActivitiesByDate(user, date);
    }

    // GET ACTIVITY BY ID
    @GetMapping("/{id}")
    public DailyActivity getActivityById(@RequestHeader("Authorization") String token,
                                         @PathVariable Long id) {
        User user = getCurrentUser(token);
        DailyActivity activity = activityService.getActivityById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));

        if (!activity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to view this activity.");
        }
        return activity;
    }

    // UPDATE ACTIVITY
    @PutMapping("/{id}")
    public DailyActivity updateActivity(@RequestHeader("Authorization") String token,
                                        @PathVariable Long id,
                                        @RequestBody DailyActivityRequest request) {
        User user = getCurrentUser(token);
        return activityService.updateActivity(id, user, request);
    }

    // DELETE ACTIVITY
    @DeleteMapping("/{id}")
    public String deleteActivity(@RequestHeader("Authorization") String token,
                                 @PathVariable Long id) {
        User user = getCurrentUser(token);
        activityService.deleteActivity(id, user);
        return "Activity deleted successfully!";
    }
}
