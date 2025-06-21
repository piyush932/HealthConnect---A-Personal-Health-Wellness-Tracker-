import React from 'react';
import UserProfileCard from '../components/Dashboard/UserProfileCard';
import GoalsProgress from '../components/Dashboard/GoalsProgress';
import DoughnutChart from '../components/Dashboard/PiChart';
import WaterIntakeChart from '../components/Dashboard/WaterIntakeChart';
import SleepTrackerChart from '../components/Dashboard/SleepTrackerChart';
import MoodChart from '../components/Dashboard/MoodChart';

export default function Dashboard() {
  const [profile, setProfile] = React.useState({
    name: 'John Doe',
    age: '25',
    weight: '70kg',
    hight: '175cm',
    fitnessGoals: 'Build muscle and stay healthy',
  });

  const [loading, setLoading] = React.useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); // Shorter load for dev

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Main Content */}
      <main className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 space-y-8 mt-8 md:mt-0">
            {loading ? (
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-solid"></div>
              </div>
            ) : (
              <>
                {/* Profile + Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <UserProfileCard
                    name={profile.name}
                    age={profile.age}
                    weight={profile.weight}
                    height={profile.hight}
                    fitnessGoals={profile.fitnessGoals}
                  />
                  <GoalsProgress tittle="Daily Goals" />
                  <GoalsProgress tittle="Weekly Goals" />
                </div>

                <div className= {loading ? ('hidden'):(" ")}>
                <WaterIntakeChart/>
                <SleepTrackerChart/>
                <MoodChart/>
                </div>

                {/* Charts and Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <DoughnutChart />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
