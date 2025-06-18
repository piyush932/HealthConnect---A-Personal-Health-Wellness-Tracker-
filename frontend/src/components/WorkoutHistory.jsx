import React from 'react';
import { Calendar, Clock, Flame } from 'lucide-react';
import { Loader } from 'rsuite';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WorkoutHistory({
  width = '',
  marginTop = '',
  marginLR = '',
  renderHistory = false,
}) {
  const [workouts, setWorkouts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Dummy data
  const dummyWorkoutData = [
    {
      $id: '1',
      Date: '2025-06-15',
      Workout: 'Chest',
      Duration: 45,
      CaloriesBurned: 500,
    },
    {
      $id: '2',
      Date: '2025-06-14',
      Workout: 'Back',
      Duration: 40,
      CaloriesBurned: 450,
    },
    {
      $id: '3',
      Date: '2025-06-13',
      Workout: 'Legs',
      Duration: 60,
      CaloriesBurned: 600,
    },
    {
      $id: '4',
      Date: '2025-06-12',
      Workout: 'Shoulders',
      Duration: 35,
      CaloriesBurned: 400,
    },
    {
      $id: '5',
      Date: '2025-06-11',
      Workout: 'Arms',
      Duration: 30,
      CaloriesBurned: 300,
    },
    {
      $id: '6',
      Date: '2025-06-10',
      Workout: 'Cardio',
      Duration: 50,
      CaloriesBurned: 700,
    },
  ];

  React.useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setWorkouts(dummyWorkoutData);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const firstFiveHistory = workouts.slice(0, 5);
  const renderWorkout = renderHistory ? workouts : firstFiveHistory;

  return (
    <div
      className={`bg-white p-6 mt-8 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
        transition={Slide}
      />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader size="sm" />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Workout History</h2>
          <table className="w-full min-w-max table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 border-b">
                <th className="py-2 px-4 font-semibold">Date</th>
                <th className="py-2 px-4 font-semibold">Workout</th>
                <th className="py-2 px-4 font-semibold">Duration</th>
                <th className="py-2 px-4 font-semibold">Calories</th>
              </tr>
            </thead>
            <tbody>
              {renderWorkout.map((workout) => (
                <tr key={workout.$id} className="border-b">
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-indigo-600 mr-2" />
                      {formatDate(workout.Date)}
                    </div>
                  </td>
                  <td className="py-2 px-4">{workout.Workout}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-indigo-600 mr-2" />
                      {workout.Duration} mins
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 text-indigo-600 mr-2" />
                      {workout.CaloriesBurned} kcals
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default WorkoutHistory;
