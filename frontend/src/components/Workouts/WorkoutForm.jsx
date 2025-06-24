import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Dumbbell, Clock, Flame, Footprints } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function WorkoutForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8080/activity', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      toast.success('Activity added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding activity:', error);
      toast.error(error.response?.data?.message || 'Failed to add activity.');
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />
      <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Log Your Workout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Health Benefits Metrics */}
        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Why Regular Exercise Matters 🏃‍♂️</h3>
          <p className="text-gray-700 mb-4">
            Regular physical activity boosts physical health, brain function, and overall longevity. Tracking your workouts ensures consistency and motivates progress.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Increases Lifespan:</strong> Just 30 minutes of moderate exercise daily can extend life by <span className="text-blue-600 font-semibold">3–7 years</span>.</li>
            <li><strong>Reduces Chronic Disease Risk:</strong> Regular activity lowers risk of heart disease, stroke, and type 2 diabetes by <span className="text-blue-600 font-semibold">35–50%</span>.</li>
            <li><strong>Enhances Mental Health:</strong> Exercise reduces symptoms of depression and anxiety by <span className="text-blue-600 font-semibold">26%</span> (WHO).</li>
            <li><strong>Boosts Brain Function:</strong> Just 20 minutes of movement improves memory and attention span by up to <span className="text-blue-600 font-semibold">15%</span>.</li>
            <li><strong>Improves Sleep & Energy:</strong> Active individuals report <span className="text-blue-600 font-semibold">65% better sleep</span> and higher daily energy.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            💪 Every rep, every step, every log counts toward a stronger, healthier life. Stay consistent and track your efforts!
          </p>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              <CalendarIcon className="inline-block mr-2 h-5 w-5" />
              Date:
            </label>
            <input
              type="date"
              id="date"
              {...register("activityDate", { required: "Date is required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.activityDate && <p className="text-sm text-red-500">{errors.activityDate.message}</p>}
          </div>

          {/* Workout */}
          <div>
            <label htmlFor="workout" className="block text-sm font-medium text-gray-700 mb-1">
              <Dumbbell className="inline-block mr-2 h-5 w-5" />
              Workout:
            </label>
            <input
              type="text"
              id="workout"
              {...register("workoutType", { required: "Workout is required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Chest, Arms"
            />
            {errors.workoutType && <p className="text-sm text-red-500">{errors.workoutType.message}</p>}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline-block mr-2 h-5 w-5" />
              Duration (minutes):
            </label>
            <input
              type="number"
              id="duration"
              {...register("durationMinutes", {
                required: "Duration is required",
                min: { value: 1, message: "Minimum 1 minute required" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 30"
            />
            {errors.durationMinutes && <p className="text-sm text-red-500">{errors.durationMinutes.message}</p>}
          </div>

          {/* Calories */}
          <div>
            <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
              <Flame className="inline-block mr-2 h-5 w-5" />
              Calories Burned:
            </label>
            <input
              type="number"
              id="calories"
              {...register("caloriesBurned", {
                required: "Calories is required",
                min: { value: 0, message: "Calories must be non-negative" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 500"
            />
            {errors.caloriesBurned && <p className="text-sm text-red-500">{errors.caloriesBurned.message}</p>}
          </div>

          {/* Steps Taken */}
          <div>
            <label htmlFor="stepsTaken" className="block text-sm font-medium text-gray-700 mb-1">
              <Footprints className="inline-block mr-2 h-5 w-5" />
              Steps Taken:
            </label>
            <input
              type="number"
              id="stepsTaken"
              {...register("stepsTaken", {
                required: "Steps taken is required",
                min: { value: 0, message: "Steps must be non-negative" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 8000"
            />
            {errors.stepsTaken && <p className="text-sm text-red-500">{errors.stepsTaken.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
