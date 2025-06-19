package com.incture.repository;

import com.incture.entity.DailyActivity;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyActivityRepository extends JpaRepository<DailyActivity, Long> {
    List<DailyActivity> findByUser(User user);
    List<DailyActivity> findByUserAndActivityDate(User user, LocalDate date);
}
