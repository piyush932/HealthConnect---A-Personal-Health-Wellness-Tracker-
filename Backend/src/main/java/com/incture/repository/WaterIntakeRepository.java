package com.incture.repository;

import com.incture.entity.WaterIntake;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {
    List<WaterIntake> findByUser(User user);
    List<WaterIntake> findByUserAndIntakeDate(User user, LocalDate intakeDate);
}
