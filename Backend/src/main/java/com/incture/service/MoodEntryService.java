package com.incture.service;

import com.incture.dto.MoodEntryRequest;
import com.incture.entity.MoodEntry;
import com.incture.entity.User;
import com.incture.repository.MoodEntryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MoodEntryService {

    private final MoodEntryRepository repository;

    public MoodEntryService(MoodEntryRepository repository) {
        this.repository = repository;
    }

    public MoodEntry addMoodEntry(User user, MoodEntryRequest request) {
        MoodEntry entry = new MoodEntry();
        entry.setUser(user);
        entry.setEntryDate(request.getEntryDate());
        entry.setMoodRating(request.getMoodRating());
        entry.setNotes(request.getNotes());
        return repository.save(entry);
    }

    public List<MoodEntry> getAllMoodEntries(User user) {
        return repository.findByUser(user);
    }

    public List<MoodEntry> getMoodEntriesByDate(User user, LocalDate date) {
        return repository.findByUserAndEntryDate(user, date);
    }

    public Optional<MoodEntry> getMoodEntryById(Long id) {
        return repository.findById(id);
    }

    public MoodEntry updateMoodEntry(Long id, User user, MoodEntryRequest request) {
        MoodEntry entry = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mood Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        entry.setEntryDate(request.getEntryDate());
        entry.setMoodRating(request.getMoodRating());
        entry.setNotes(request.getNotes());
        return repository.save(entry);
    }

    public void deleteMoodEntry(Long id, User user) {
        MoodEntry entry = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mood Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        repository.delete(entry);
    }
}
