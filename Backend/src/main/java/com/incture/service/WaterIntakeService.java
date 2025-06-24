package com.incture.service;

import com.incture.dto.WaterIntakeRequest;
import com.incture.entity.WaterIntake;
import com.incture.entity.User;
import com.incture.repository.WaterIntakeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WaterIntakeService {

    private final WaterIntakeRepository repository;

    public WaterIntakeService(WaterIntakeRepository repository) {
        this.repository = repository;
    }

    public WaterIntake addWaterIntake(User user, WaterIntakeRequest request) {
        WaterIntake intake = new WaterIntake();
        intake.setIntakeDate(request.getIntakeDate());
        intake.setAmountInLiters(request.getAmountInLiters());
        intake.setUser(user);
        return repository.save(intake);
    }

    public List<WaterIntake> getAll(User user) {
        return repository.findByUser(user);
    }

    public List<WaterIntake> getByDate(User user, LocalDate date) {
        return repository.findByUserAndIntakeDate(user, date);
    }

    public Optional<WaterIntake> getById(Long id) {
        return repository.findById(id);
    }

    public WaterIntake updateWaterIntake(Long id, User user, WaterIntakeRequest request) {
        WaterIntake intake = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Water intake not found"));

        if (!intake.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        intake.setIntakeDate(request.getIntakeDate());
        intake.setAmountInLiters(request.getAmountInLiters());

        return repository.save(intake);
    }

    public void deleteWaterIntake(Long id, User user) {
        WaterIntake intake = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Water intake not found"));

        if (!intake.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        repository.delete(intake);
    }
}
