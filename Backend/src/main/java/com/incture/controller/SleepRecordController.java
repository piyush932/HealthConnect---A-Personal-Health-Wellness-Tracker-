package com.incture.controller;

import com.incture.dto.SleepRecordRequest;
import com.incture.entity.SleepRecord;
import com.incture.entity.User;
import com.incture.repository.UserRepository;
import com.incture.service.SleepRecordService;
import com.incture.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sleep")
public class SleepRecordController {

    private final SleepRecordService service;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public SleepRecordController(SleepRecordService service, UserRepository userRepository, JwtUtil jwtUtil) {
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
    public SleepRecord create(@RequestHeader("Authorization") String token, @RequestBody SleepRecordRequest request) {
        User user = getCurrentUser(token);
        return service.create(user, request);
    }

    @GetMapping
    public List<SleepRecord> getAll(@RequestHeader("Authorization") String token) {
        User user = getCurrentUser(token);
        return service.getAll(user);
    }

    @GetMapping("/byDate")
    public List<SleepRecord> getByDate(@RequestHeader("Authorization") String token, @RequestParam String date) {
        User user = getCurrentUser(token);
        LocalDate localDate = LocalDate.parse(date);
        return service.getByDate(user, localDate);
    }

    @GetMapping("/{id}")
    public SleepRecord getById(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        User user = getCurrentUser(token);
        SleepRecord record = service.getById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        if (!record.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        return record;
    }

    @PutMapping("/{id}")
    public SleepRecord update(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody SleepRecordRequest request) {
        User user = getCurrentUser(token);
        return service.update(id, user, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        User user = getCurrentUser(token);
        service.delete(id, user);
        return "Sleep record deleted successfully";
    }
}
