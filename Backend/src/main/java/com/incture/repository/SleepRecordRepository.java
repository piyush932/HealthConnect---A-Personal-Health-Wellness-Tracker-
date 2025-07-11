package com.incture.repository;

import com.incture.dto.AnalyticsResponse;
import com.incture.entity.SleepRecord;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SleepRecordRepository extends JpaRepository<SleepRecord, Long> {

    List<SleepRecord> findByUser(User user);
    List<SleepRecord> findByUserAndSleepDate(User user, LocalDate sleepDate);

    @Query("SELECT new com.incture.dto.AnalyticsResponse$SleepSummary(" +
            "s.sleepDate, " +
            "SUM(s.sleepHours), " +  // ✅ Using pre-calculated sleepHours
            "MAX(s.qualityRating)) " +
            "FROM SleepRecord s " +
            "WHERE s.user.id = :userId " +
            "AND FUNCTION('MONTH', s.sleepDate) = :month " +
            "AND FUNCTION('YEAR', s.sleepDate) = :year " +
            "GROUP BY s.sleepDate")
    List<AnalyticsResponse.SleepSummary> findMonthlySleepSummary(@Param("userId") Long userId,
                                                                 @Param("month") int month,
                                                                 @Param("year") int year);
}
