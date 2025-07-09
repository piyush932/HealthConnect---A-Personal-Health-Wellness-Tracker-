// GoalSettingController.java
package com.incture.controller;

import com.incture.dto.GoalSettingRequest;
import com.incture.entity.GoalSetting;
import com.incture.entity.User;
import com.incture.repository.UserRepository;
import com.incture.service.GoalSettingService;
import com.incture.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalSettingController {

    private final GoalSettingService service;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public GoalSettingController(GoalSettingService service, JwtUtil jwtUtil, UserRepository userRepo) {
        this.service = service;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
    }

    private User getCurrentUser(String token) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtUtil.extractUsername(jwt);
        return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public GoalSetting setGoal(@RequestHeader("Authorization") String token,
                               @RequestBody GoalSettingRequest request) {
        User user = getCurrentUser(token);
        return service.createGoal(user, request);
    }

    @GetMapping
    public List<GoalSetting> getGoals(@RequestHeader("Authorization") String token) {
        User user = getCurrentUser(token);
        return service.getGoals(user);
    }

    @DeleteMapping("/{id}")
    public String deleteGoal(@RequestHeader("Authorization") String token,
                             @PathVariable Long id) {
        User user = getCurrentUser(token);
        service.deleteGoal(user, id);
        return "Goal deleted successfully.";
    }
}
