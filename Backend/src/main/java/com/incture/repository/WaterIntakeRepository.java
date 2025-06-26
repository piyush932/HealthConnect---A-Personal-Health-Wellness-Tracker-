package com.incture.repository;

import com.incture.dto.AnalyticsResponse;
import com.incture.entity.WaterIntake;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {

    List<WaterIntake> findByUser(User user);
    List<WaterIntake> findByUserAndIntakeDate(User user, LocalDate intakeDate);

    @Query("SELECT new com.incture.dto.AnalyticsResponse$WaterIntakeStats(" +
    	       "w.intakeDate, SUM(w.amountInLiters)) " +
    	       "FROM WaterIntake w " +
    	       "WHERE w.user.id = :userId " +
    	       "AND FUNCTION('MONTH', w.intakeDate) = :month " +
    	       "AND FUNCTION('YEAR', w.intakeDate) = :year " +
    	       "GROUP BY w.intakeDate")
    	List<AnalyticsResponse.WaterIntakeStats> findMonthlyWaterIntake(@Param("userId") Long userId,
    	                                                                 @Param("month") int month,
    	                                                                 @Param("year") int year);
}
