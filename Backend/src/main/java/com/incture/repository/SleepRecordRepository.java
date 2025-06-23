package com.incture.repository;

import com.incture.entity.SleepRecord;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SleepRecordRepository extends JpaRepository<SleepRecord, Long> {
    List<SleepRecord> findByUser(User user);
    List<SleepRecord> findByUserAndSleepDate(User user, LocalDate sleepDate);
}
