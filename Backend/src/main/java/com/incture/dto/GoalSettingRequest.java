// GoalSettingRequest.java
package com.incture.dto;

import java.time.LocalDate;

public class GoalSettingRequest {
    public String type;
    public int targetValue;
    public String frequency;
    public LocalDate startDate;
    public LocalDate endDate;
}
