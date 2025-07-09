package com.incture.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private int age;
    private double height;
    private double weight;

    // === One-to-Many Relationships ===

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DailyActivity> dailyActivities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SleepRecord> sleepRecords;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MoodEntry> moodEntries;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WaterIntake> waterIntakes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DailyProgress> dailyProgresses;

    // === Constructors ===

    public User() {}

    public User(String name, String email, String password, int age, double height, double weight) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }

    // === Getters and Setters ===

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public double getHeight() { return height; }
    public void setHeight(double height) { this.height = height; }

    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }

    public List<DailyActivity> getDailyActivities() { return dailyActivities; }
    public void setDailyActivities(List<DailyActivity> dailyActivities) {
        this.dailyActivities = dailyActivities;
    }

    public List<SleepRecord> getSleepRecords() { return sleepRecords; }
    public void setSleepRecords(List<SleepRecord> sleepRecords) {
        this.sleepRecords = sleepRecords;
    }

    public List<MoodEntry> getMoodEntries() { return moodEntries; }
    public void setMoodEntries(List<MoodEntry> moodEntries) {
        this.moodEntries = moodEntries;
    }

    public List<WaterIntake> getWaterIntakes() { return waterIntakes; }
    public void setWaterIntakes(List<WaterIntake> waterIntakes) {
        this.waterIntakes = waterIntakes;
    }

    public List<DailyProgress> getDailyProgresses() { return dailyProgresses; }
    public void setDailyProgresses(List<DailyProgress> dailyProgresses) {
        this.dailyProgresses = dailyProgresses;
    }

    @Override
    public String toString() {
        return "User{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", email='" + email + '\'' +
               ", password='" + password + '\'' +
               ", age=" + age +
               ", height=" + height +
               ", weight=" + weight +
               '}';
    }
}
