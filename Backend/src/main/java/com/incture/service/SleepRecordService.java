package com.incture.service;

import com.incture.dto.SleepRecordRequest;
import com.incture.entity.SleepRecord;
import com.incture.entity.User;
import com.incture.repository.SleepRecordRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class SleepRecordService {

    private final SleepRecordRepository repository;

    public SleepRecordService(SleepRecordRepository repository) {
        this.repository = repository;
    }

    public SleepRecord create(User user, SleepRecordRequest request) {
        SleepRecord record = new SleepRecord();
        record.setUser(user);
        record.setSleepDate(request.getSleepDate());
        record.setSleepStartTime(request.getSleepStartTime());
        record.setSleepEndTime(request.getSleepEndTime());
        record.setQualityRating(request.getQualityRating());
        record.setNotes(request.getNotes());

        double sleepHours = calculateSleepHours(request.getSleepStartTime(), request.getSleepEndTime());
        record.setSleepHours(sleepHours); // Set calculated hours

        return repository.save(record);
    }

    public List<SleepRecord> getAll(User user) {
        return repository.findByUser(user);
    }

    public List<SleepRecord> getByDate(User user, LocalDate date) {
        return repository.findByUserAndSleepDate(user, date);
    }

    public Optional<SleepRecord> getById(Long id) {
        return repository.findById(id);
    }

    public SleepRecord update(Long id, User user, SleepRecordRequest request) {
        SleepRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        if (!record.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        record.setSleepDate(request.getSleepDate());
        record.setSleepStartTime(request.getSleepStartTime());
        record.setSleepEndTime(request.getSleepEndTime());
        record.setQualityRating(request.getQualityRating());
        record.setNotes(request.getNotes());

        double sleepHours = calculateSleepHours(request.getSleepStartTime(), request.getSleepEndTime());
        record.setSleepHours(sleepHours); // Update sleep hours

        return repository.save(record);
    }

    public void delete(Long id, User user) {
        SleepRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        if (!record.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        repository.delete(record);
    }

    // Method to calculate sleep hours, handling cross-midnight
    private double calculateSleepHours(LocalTime start, LocalTime end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Sleep start and end time must not be null");
        }

        Duration duration;

        if (end.equals(start)) {
            return 0.0;
        } else if (end.isBefore(start)) {
            // Crosses midnight, e.g. 23:00 to 05:00
            duration = Duration.between(start, LocalTime.of(23, 59, 59))
                    .plusSeconds(1)  // To complete the full 24h
                    .plus(Duration.between(LocalTime.MIN, end));
        } else {
            duration = Duration.between(start, end);
        }

        double hours = duration.toMinutes() / 60.0;
        hours = Math.round(hours * 100.0) / 100.0;

        // Only reject truly invalid values
        if (hours < 0 || hours > 16) {
            throw new IllegalArgumentException("Invalid sleep duration: " + hours + " hours. Must be between 0 and 16.");
        }

        return hours;
    }




}
