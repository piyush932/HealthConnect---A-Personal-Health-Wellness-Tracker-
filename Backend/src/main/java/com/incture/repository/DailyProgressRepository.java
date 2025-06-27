package com.incture.repository;

import com.incture.entity.DailyProgress;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyProgressRepository extends JpaRepository<DailyProgress, Long> {
    Optional<DailyProgress> findByUserAndDate(User user, LocalDate date);
    List<DailyProgress> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);
}
