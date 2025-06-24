package com.incture.repository;

import com.incture.entity.MoodEntry;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    List<MoodEntry> findByUser(User user);
    List<MoodEntry> findByUserAndEntryDate(User user, LocalDate date);
}
