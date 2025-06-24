package com.incture.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "water_intake")
public class WaterIntake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate intakeDate;

    private double amountInLiters;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors
    public WaterIntake() {}

    public WaterIntake(LocalDate intakeDate, double amountInLiters, User user) {
        this.intakeDate = intakeDate;
        this.amountInLiters = amountInLiters;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getIntakeDate() { return intakeDate; }
    public void setIntakeDate(LocalDate intakeDate) { this.intakeDate = intakeDate; }
    public double getAmountInLiters() { return amountInLiters; }
    public void setAmountInLiters(double amountInLiters) { this.amountInLiters = amountInLiters; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
