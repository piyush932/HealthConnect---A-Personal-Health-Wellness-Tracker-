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
        Duration duration;
        if (end.isBefore(start) || end.equals(start)) {
            // Crosses midnight or exactly 24h
            duration = Duration.between(start, LocalTime.MIDNIGHT)
                       .plus(Duration.between(LocalTime.MIN, end));
        } else {
            duration = Duration.between(start, end);
        }
        return duration.toMinutes() / 60.0;
    }


}
