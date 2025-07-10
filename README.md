# 🩺 HealthConnect – A Personal Health \& Wellness Tracker

## 🚀 Project Overview

**HealthConnect** is a full-stack personal health and wellness application designed to empower users to take control of their well-being. It enables users to track daily activities, sleep patterns, water intake, and mood. With a clean UI, insightful charts, and robust backend authentication, this project showcases the practical use of **Java Spring Boot**, **React.js**, and **MySQL** to solve real-world challenges involving data input, time-series data management, and data visualization.

## ✨ Features

### 🔐 User Management \& Authentication

- JWT-based User Registration \& Login
- Protected API Routes and session-token validation
- Token stored in `localStorage`, cleared upon logout
- User Profile editing (name, age, height, weight)
- Logout removes token and sensitive data from session


### 🏃 Activity Tracking

- Track daily workouts: type, duration, steps, and calories burned
- Full CRUD operations for each workout entry
- View daily and weekly stats with step progress bar
- Editable \& deletable entries for today’s logs
- Reminders via `react-toastify` if no activity is logged for today


### 🛏️ Sleep Logging

- Input start \& end time, with auto-calculated sleep hours
- Rate sleep quality (1 to 5) and add notes
- Validates end time must be after start time and duration must be positive
- Visualize sleep history via Bar Chart + Average Line using Chart.js
- Sleep History Component shows all entries with edit/delete for today


### 💧 Water Intake \& 😊 Mood Tracker

- Log daily water in liters or cups
- Record mood via emoji scale (1–5) with optional notes
- Multiple entries supported per day, aggregated by date
- Bar charts for water \& pie/line chart for mood trends
- Supports CRUD with token-based authentication
- Hourly hydration reminders using toast notifications


### 🎯 Goals \& Progress Module

- Set and track daily/weekly goals (steps, calories)
- Weekly reset logic runs every Sunday
- Visual tracking of target vs actual (calories, steps)
- Pie charts for percentage completion using Recharts
- In-app toast alerts if goals are incomplete by end of day


### 📊 Data Visualization \& Insights

- Track weekly/monthly insights:
    - Total steps walked
    - Average sleep per month
    - Water intake trends
    - Mood distribution
- Uses Chart.js and Recharts across modules
- Dynamic charts update based on token-authenticated API data


## 🛠️ Tech Stack

| Layer | Tech / Library | Usage Description |
| :-- | :-- | :-- |
| **Frontend** | React (Vite), Tailwind CSS | Responsive UI with fast build system |
|  | Axios | API communication with JWT token in headers |
|  | Chart.js / react-chartjs-2 | Time-series visualizations: sleep and water intake trends |
|  | Recharts | Goal progress and mood summaries with pie, bar, and line charts |
|  | react-toastify | In-app reminders (side toasts) |
|  | react-hook-form | Form control with validation |
|  | react-router-dom | Routing/navigation |
|  | moment / dayjs | Time formatting and calculations |
|  | rsuite | UI components like modals/loaders |
|  | lucide-react / react-icons | Iconography |

## 📁 App Structure

```
HealthConnect/
Backend/
    ├── .mvn/
        └── wrapper/
            └── maven-wrapper.properties
    ├── src/
        ├── main/
            ├── java/
                └── com/
                    └── incture/
                        ├── config/
                            ├── CorsConfig.java
                            └── SecurityConfig.java
                        ├── controller/
                            ├── AnalyticsController.java
                            ├── AuthController.java
                            ├── DailyActivityController.java
                            ├── DailyProgressController.java
                            ├── MoodEntryController.java
                            ├── SleepRecordController.java
                            ├── UserController.java
                            └── WaterIntakeController.java
                        ├── dto/
                            ├── AnalyticsResponse.java
                            ├── AuthResponse.java
                            ├── DailyActivityRequest.java
                            ├── DailyActivityResponse.java
                            ├── DailyProgressRequest.java
                            ├── LoginRequest.java
                            ├── MoodEntryRequest.java
                            ├── RegisterRequest.java
                            ├── SleepRecordRequest.java
                            ├── WaterIntakeRequest.java
                            └── WeeklyProgressResponse.java
                        ├── entity/
                            ├── DailyActivity.java
                            ├── DailyProgress.java
                            ├── MoodEntry.java
                            ├── SleepRecord.java
                            ├── User.java
                            └── WaterIntake.java
                        ├── repository/
                            ├── DailyActivityRepository.java
                            ├── DailyProgressRepository.java
                            ├── MoodEntryRepository.java
                            ├── SleepRecordRepository.java
                            ├── UserRepository.java
                            └── WaterIntakeRepository.java
                        ├── security/
                            └── JwtAuthFilter.java
                        ├── service/
                            ├── AnalyticsService.java
                            ├── CustomUserDetailsService.java
                            ├── DailyActivityService.java
                            ├── DailyProgressService.java
                            ├── MoodEntryService.java
                            ├── SleepRecordService.java
                            └── WaterIntakeService.java
                        ├── util/
                            └── JwtUtil.java
                        └── FullStackProjectApplication.java
            └── resources/
                └── application.properties
        └── test/
            └── java/
                └── com/
                    └── incture/
                        └── FullStackProjectApplicationTests.java
    ├── .gitattributes
    ├── .gitignore
    ├── mvnw
    ├── mvnw.cmd
    └── pom.xml
frontend/
    ├── public/
        └── vite.svg
    ├── src/
        ├── assets/
            ├── data-stats-around-person-doing-physical-activity.jpg
            ├── download.jpeg
            ├── fitness2.jpeg
            ├── fitness3.jpeg
            ├── front-view-man-tank-top-holding-weights-with-copy-space.jpg
            ├── img1.jpeg
            ├── physical-activity-stats-around-person.jpg
            ├── react.svg
            └── young-sportswomen-resting-dark-studio.jpg
        ├── components/
            ├── Dashboard/
                ├── GoalsProgress.jsx
                ├── MoodChart.jsx
                ├── PiChart.jsx
                ├── SleepTrackerChart.jsx
                ├── UserProfileCard.jsx
                └── WaterIntakeChart.jsx
            ├── Footer/
                └── Footer.jsx
            ├── Forms/
                ├── LoginForm.jsx
                └── SignUpFrom.jsx
            ├── Header/
                └── Header.jsx
            ├── HeroSection/
                └── HeroSection.jsx
            ├── Mood/
                ├── MoodForm.jsx
                └── MoodHistory.jsx
            ├── Sidebar/
                └── Sidebar.jsx
            ├── SleepTracker/
                ├── SleepForm.jsx
                └── SleepHistory.jsx
            ├── Water/
                ├── WaterHistory.jsx
                └── WaterIntakeForm.jsx
            ├── Workouts/
                ├── WorkoutForm.jsx
                └── WorkoutHistory.jsx
            ├── DailyGoals.jsx
            ├── Input.jsx
            ├── Loader.jsx
            └── UserProfileForm.jsx
        ├── pages/
            ├── Dashboard.jsx
            ├── History.jsx
            ├── Home.jsx
            ├── Layout.jsx
            ├── Login.jsx
            ├── Progress.jsx
            ├── SignUp.jsx
            ├── UserProfile.jsx
            └── Workouts.jsx
        ├── App.css
        ├── App.jsx
        ├── index.css
        └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```


## 🔗 API Endpoints

### 👤 User

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login \& receive JWT |
| GET | `/user/profile` | Get profile (JWT required) |
| PUT | `/user/profile` | Update user info |

### 🏃 Activity

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | `/activity` | Log new activity |
| GET | `/activity` | Get all activities |
| GET | `/activity/byDate` | Get by specific date |
| PUT | `/activity/{id}` | Edit entry |
| DELETE | `/activity/{id}` | Remove entry |

### 💤 Sleep

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | `/sleep` | Add sleep log |
| GET | `/sleep` | Get sleep history |
| PUT | `/sleep/{id}` | Update sleep entry |
| DELETE | `/sleep/{id}` | Delete sleep record |

### 💧 Water Intake \& 😊 Mood

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| POST | `/water` | Log water intake |
| GET | `/water` | Get water logs |
| PUT | `/water/{id}` | Edit water entry |
| DELETE | `/water/{id}` | Delete water entry |
| POST | `/mood` | Log mood |
| GET | `/mood` | Fetch mood entries |
| PUT | `/mood/{id}` | Edit mood log |
| DELETE | `/mood/{id}` | Delete mood |

### 📈 Progress

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | `/progress` | Get goals (daily/weekly) |
| PUT | `/progress` | Update goal progress manually |

### 📤 Data Export

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | `/export/all` | Export all user health data as CSV (JWT required) |

## 🔥 Stretch Goals

Some of the stretch goals have been implemented:

- Goal Setting: Users can set and track daily/weekly health goals.
- Reminders: In-app and hourly reminders for activities , sleep , mood and hydration.
- Data Export: Export all health data as CSV via the /export/all endpoint.
- Advanced Visualizations: Enhanced charts and analytics for trends and progress.


## 🧑‍🤝‍🧑 Project Workflow \& Collaboration

### 🛠 Agile Development

- Weekly Sprint Planning
- Kanban Board for task tracking
- Clear deliverables for each module


### 🔧 Git Strategy

- Protected `main` branch
- Feature branches for each module
- PR reviews before merging


## ▶️ Getting Started (Dev Setup)

```bash
# Clone the repository
git clone https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-.git

# Backend Setup
cd backend
./mvnw spring-boot:run

# Frontend Setup
cd frontend
npm install
npm run dev
```


## 🧪 Testing
You can test the HealthConnect project using the following tools and frameworks:
- Backend: JUnit (for unit and integration testing) , Mockito (for mocking dependencies and service layers)
- Frontend: Jest (for JavaScript/React component testing) , React Testing Library (for UI and interaction testing)


## 🔗 Deployment
 The following options are available for when you are ready to deploy:

- Containerize both backend and frontend for consistent deployment across environments.
- Deployable via Netlify or Vercel for fast, scalable static hosting.
- Deployable on Render, AWS, Google Cloud Platform (GCP), or Heroku for managed backend hosting.

## 💬 Conclusion

**HealthConnect** is a modern, full-stack wellness app that blends clean design with functional depth. It provides the foundational blueprint for building real-world SaaS-like health tracking applications and is extensible with features like notifications, gamification, and advanced analytics.


## Screen Shots

### Module 1:  User Management & Authentication
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Home%20page.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/localhost_5173_login.png)     | 
| &nbsp; |
| ![Screenshot 3](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Registration%20Page.png)  | 
| &nbsp; |
| ![Screenshot 4](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/localhost_5173_dashboard.png)      | 
| &nbsp; |
| ![Screenshot 5](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/localhost_5173_userprofile.png)       | 
| &nbsp; |
| ![Screenshot 6](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Screenshot%202025-07-10%20120445.png)         | 
| &nbsp; |

### Module 2:  Daily Activity Tracking
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Workout.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Workout%20history.png)     | 
| &nbsp; |
| ![Screenshot 3](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Calender.png)  | 
| &nbsp; |

### Module 3:  Sleep Tracking
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/sleep%20form.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/localhost_5173_sleepHistory.png)     | 
| &nbsp; |
| ![Screenshot 3](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/view%20and%20edit%20sleep%20note.png)  | 
| &nbsp; |

### Module 4:  Water Intake & Mood Logging 
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/water%20intake%20form.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/water%20history.png)     | 
| &nbsp; |
| ![Screenshot 3](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Mood%20tracker.png)  | 
| &nbsp; |
| ![Screenshot 4](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Mood%20history.png)      | 
| &nbsp; |

### Module 5:  Data Visualization & Trends 
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Mood%20trends%20graph.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Water%20intake%20graph.png)     | 
| &nbsp; |

### Stretch Goals:
####  Goal Setting
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/localhost_5173_progress.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/progress%20dashboard.png)     | 
| &nbsp; |

####  Reminders/Notifications: 
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Activity_Remainder.png)  | 
| --- |
| &nbsp; |
| ![Screenshot 2](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Mood_Remainder.png)     | 
| &nbsp; |
| ![Screenshot 3](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Sleep_Remainder.png)     | 
| &nbsp; |
| ![Screenshot 4](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Water_Remainder.png)     | 
| &nbsp; |

####  Data Export: 
| ![Screenshot 1](https://github.com/piyush932/HealthConnect---A-Personal-Health-Wellness-Tracker-/blob/main/frontend/Screenshots/Screenshot%202025-07-10%20120445.png)  | 
| --- |
| &nbsp; |



