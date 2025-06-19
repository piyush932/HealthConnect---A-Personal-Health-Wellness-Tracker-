package com.incture.service;

import com.incture.dto.DailyActivityRequest;
import com.incture.entity.DailyActivity;
import com.incture.entity.User;
import com.incture.repository.DailyActivityRepository;
import com.incture.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DailyActivityService {

    private final DailyActivityRepository activityRepository;
    private final UserRepository userRepository;

    public DailyActivityService(DailyActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public DailyActivity createActivity(User user, DailyActivityRequest request) {
        DailyActivity activity = new DailyActivity();
        activity.setStepsTaken(Integer.valueOf(request.getStepsTaken()));
        activity.setCaloriesBurned(request.getCaloriesBurned());
        activity.setWorkoutType(request.getWorkoutType());
        activity.setDurationMinutes(request.getDurationMinutes());
        activity.setActivityDate(request.getActivityDate());
        activity.setUser(user);

        return activityRepository.save(activity);
    }

    public List<DailyActivity> getActivities(User user) {
        return activityRepository.findByUser(user);
    }

    public List<DailyActivity> getActivitiesByDate(User user, LocalDate date) {
        return activityRepository.findByUserAndActivityDate(user, date);
    }

    public Optional<DailyActivity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    public DailyActivity updateActivity(Long id, User user, DailyActivityRequest request) {
        DailyActivity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));

        if (!activity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to update this activity.");
        }

        activity.setStepsTaken(Integer.valueOf(request.getStepsTaken()));
        activity.setCaloriesBurned(request.getCaloriesBurned());
        activity.setWorkoutType(request.getWorkoutType());
        activity.setDurationMinutes(request.getDurationMinutes());
        activity.setActivityDate(request.getActivityDate());

        return activityRepository.save(activity);
    }

    public void deleteActivity(Long id, User user) {
        DailyActivity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));

        if (!activity.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to delete this activity.");
        }

        activityRepository.delete(activity);
    }
}
