// GoalSettingRepository.java
package com.incture.repository;

import com.incture.entity.GoalSetting;
import com.incture.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalSettingRepository extends JpaRepository<GoalSetting, Long> {
    List<GoalSetting> findByUser(User user);
}
