import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Dumbbell, Clock, Flame } from 'lucide-react';

function WorkoutForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Workout Form Submitted:', data); // 👈 Log form data to console
    reset(); // Reset form after submission
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Add Workout</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Date Field */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            <CalendarIcon className="inline-block mr-2 h-5 w-5" />
            Date:
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
        </div>

        {/* Workout Field */}
        <div>
          <label htmlFor="workout" className="block text-sm font-medium text-gray-700 mb-1">
            <Dumbbell className="inline-block mr-2 h-5 w-5" />
            Workout:
          </label>
          <input
            type="text"
            id="workout"
            {...register("workout", { required: "Workout is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Biceps, Chest"
          />
          {errors.workout && <p className="mt-1 text-sm text-red-500">{errors.workout.message}</p>}
        </div>

        {/* Duration Field */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5" />
            Duration (minutes):
          </label>
          <input
            type="number"
            id="duration"
            {...register("duration", { 
              required: "Duration is required",
              min: { value: 1, message: "Duration must be at least 1 minute" },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 40"
          />
          {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>}
        </div>

        {/* Calories Field */}
        <div>
          <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
            <Flame className="inline-block mr-2 h-5 w-5" />
            Calories Burned:
          </label>
          <input
            type="number"
            id="calories"
            {...register("calories", { 
              required: "Calories is required",
              min: { value: 0, message: "Calories must be a positive number" },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 800"
          />
          {errors.calories && <p className="mt-1 text-sm text-red-500">{errors.calories.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button 
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
