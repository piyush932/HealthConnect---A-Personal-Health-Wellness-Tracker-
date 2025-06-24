package com.incture.dto;

import java.time.LocalDate;

public class WaterIntakeRequest {
    private LocalDate intakeDate;
    private double amountInLiters;

    public WaterIntakeRequest() {}

    public LocalDate getIntakeDate() { return intakeDate; }
    public void setIntakeDate(LocalDate intakeDate) { this.intakeDate = intakeDate; }

    public double getAmountInLiters() { return amountInLiters; }
    public void setAmountInLiters(double amountInLiters) { this.amountInLiters = amountInLiters; }
}
