package com.incture.controller;

import com.incture.dto.WaterIntakeRequest;
import com.incture.entity.User;
import com.incture.entity.WaterIntake;
import com.incture.repository.UserRepository;
import com.incture.service.WaterIntakeService;
import com.incture.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/water")
public class WaterIntakeController {

    private final WaterIntakeService service;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public WaterIntakeController(WaterIntakeService service, UserRepository userRepository, JwtUtil jwtUtil) {
        this.service = service;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    private User getCurrentUser(String token) {
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtUtil.extractUsername(jwt);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public WaterIntake create(@RequestHeader("Authorization") String token, @RequestBody WaterIntakeRequest request) {
        User user = getCurrentUser(token);
        return service.addWaterIntake(user, request);
    }

    @GetMapping
    public List<WaterIntake> getAll(@RequestHeader("Authorization") String token) {
        User user = getCurrentUser(token);
        return service.getAll(user);
    }

    @GetMapping("/byDate")
    public List<WaterIntake> getByDate(@RequestHeader("Authorization") String token, @RequestParam String date) {
        User user = getCurrentUser(token);
        LocalDate localDate = LocalDate.parse(date);
        return service.getByDate(user, localDate);
    }

    @PutMapping("/{id}")
    public WaterIntake update(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody WaterIntakeRequest request) {
        User user = getCurrentUser(token);
        return service.updateWaterIntake(id, user, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        User user = getCurrentUser(token);
        service.deleteWaterIntake(id, user);
        return "Water intake deleted successfully";
    }
}
