import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import HeroSection from "./components/HeroSection/HeroSection";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import History from "./pages/History";
import Dashboard from './pages/Dashboard';
import SleepForm from "./components/SleepTracker/SleepForm";
import MoodForm from "./components/Mood/MoodForm";
import SleepHistory from "./components/SleepTracker/SleepHistory";
import MoodHistory from "./components/Mood/MoodHistory";
import WaterIntakeForm from "./components/Water/WaterIntakeForm";
import WaterHistory from "./components/Water/WaterHistory";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HeroSection />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="workout" element={<Workouts />} />
        <Route path="progress" element={<Progress />} />
        <Route path="history" element={<History />} />
        <Route path="sleep" element={<SleepForm />} />
        <Route path="sleepHistory" element={<SleepHistory/>} />
        <Route path="mood" element={<MoodForm />} />
        <Route path="moodHistory" element={<MoodHistory />} />
        <Route path="water" element={<WaterIntakeForm />} />
        <Route path="waterHistory" element={<WaterHistory />} />
        
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
