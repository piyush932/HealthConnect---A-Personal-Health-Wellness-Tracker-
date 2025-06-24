package com.incture.controller;

import com.incture.dto.MoodEntryRequest;
import com.incture.entity.MoodEntry;
import com.incture.entity.User;
import com.incture.repository.UserRepository;
import com.incture.service.MoodEntryService;
import com.incture.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/mood")
public class MoodEntryController {

    private final MoodEntryService moodEntryService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public MoodEntryController(MoodEntryService moodEntryService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.moodEntryService = moodEntryService;
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
    public MoodEntry addMoodEntry(@RequestHeader("Authorization") String token,
                                   @RequestBody MoodEntryRequest request) {
        User user = getCurrentUser(token);
        return moodEntryService.addMoodEntry(user, request);
    }

    @GetMapping
    public List<MoodEntry> getAllMoodEntries(@RequestHeader("Authorization") String token) {
        User user = getCurrentUser(token);
        return moodEntryService.getAllMoodEntries(user);
    }

    @GetMapping("/byDate")
    public List<MoodEntry> getMoodEntriesByDate(@RequestHeader("Authorization") String token,
                                                 @RequestParam("date") String date) {
        User user = getCurrentUser(token);
        LocalDate localDate = LocalDate.parse(date);
        return moodEntryService.getMoodEntriesByDate(user, localDate);
    }

    @GetMapping("/{id}")
    public MoodEntry getMoodEntryById(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        User user = getCurrentUser(token);
        MoodEntry entry = moodEntryService.getMoodEntryById(id)
                .orElseThrow(() -> new RuntimeException("Mood Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        return entry;
    }

    @PutMapping("/{id}")
    public MoodEntry updateMoodEntry(@RequestHeader("Authorization") String token,
                                     @PathVariable Long id,
                                     @RequestBody MoodEntryRequest request) {
        User user = getCurrentUser(token);
        return moodEntryService.updateMoodEntry(id, user, request);
    }

    @DeleteMapping("/{id}")
    public String deleteMoodEntry(@RequestHeader("Authorization") String token, @PathVariable Long id) {
        User user = getCurrentUser(token);
        moodEntryService.deleteMoodEntry(id, user);
        return "Mood Entry deleted successfully";
    }
}
