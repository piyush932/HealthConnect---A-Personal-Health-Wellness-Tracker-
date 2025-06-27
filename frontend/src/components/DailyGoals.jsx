import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Flame, Footprints, Clock, CalendarDays } from "lucide-react";
import axios from "axios";

function DailyGoals({
  title = "Daily Goals",
  defaultTargetCalories = 1000,
  defaultBurnedCalories = 500,
  defaultCurrentSteps = 300,
  defaultTotalSteps = 700,
  defaultSpendWorkout = 45,
  defaultWorkoutTime = 60,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caloriesBurned: defaultBurnedCalories,
      outOfCaloriesBurned: defaultTargetCalories,
      stepsTaken: defaultCurrentSteps,
      targetSteps: defaultTotalSteps,
      spendWorkoutTime: defaultSpendWorkout,
      outOfWorkoutTime: defaultWorkoutTime,
      date: new Date().toISOString().slice(0, 10), // Set today's date
    },
  });

  const caloriesBurned = watch("caloriesBurned");
  const outOfCaloriesBurned = watch("outOfCaloriesBurned");
  const stepsTaken = watch("stepsTaken");
  const targetSteps = watch("targetSteps");
  const spendWorkoutTime = watch("spendWorkoutTime");
  const outOfWorkoutTime = watch("outOfWorkoutTime");

  const caloriesProgress = Math.min((caloriesBurned / outOfCaloriesBurned) * 100, 100);
  const stepsProgress = Math.min((stepsTaken / targetSteps) * 100, 100);
  const workoutProgress = outOfWorkoutTime > 0 ? Math.min((spendWorkoutTime / outOfWorkoutTime) * 100, 100) : 0;

  useEffect(() => {
    if (targetSteps < stepsTaken) {
      setError("stepsTaken", {
        type: "manual",
        message: "Target steps cannot be lower than steps taken.",
      });
    } else {
      clearErrors("stepsTaken");
    }
    if (outOfCaloriesBurned < caloriesBurned) {
      setError("caloriesBurned", {
        type: "manual",
        message: "Out of calories burned cannot be lower than calories burned.",
      });
    } else {
      clearErrors("caloriesBurned");
    }
    if (outOfWorkoutTime < spendWorkoutTime) {
      setError("spendWorkoutTime", {
        type: "manual",
        message: "Out of workout time cannot be lower than spend workout time.",
      });
    } else {
      clearErrors("spendWorkoutTime");
    }
  }, [
    stepsTaken,
    targetSteps,
    spendWorkoutTime,
    outOfWorkoutTime,
    caloriesBurned,
    outOfCaloriesBurned,
    setError,
    clearErrors,
  ]);

  const onSubmit = async (data) => {
    try {
      console.log("Sending data:", data);
      await axios.post("http://localhost:8080/progress", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Progress submitted successfully!");
    } catch (error) {
      console.error("Failed to submit progress:", error);
      alert("Failed to submit progress.");
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            <CalendarDays className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Date:
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
        </div>

        {/* Calories Burned Input */}
        <div>
          <label htmlFor="caloriesBurned" className="block text-sm font-medium text-gray-700 mb-1">
            <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Calories Burned:
          </label>
          <input
            type="number"
            id="caloriesBurned"
            {...register("caloriesBurned", {
              required: "Calories burned is required",
              min: { value: 0, message: "Calories must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.caloriesBurned && <p className="text-sm text-red-500">{errors.caloriesBurned.message}</p>}
        </div>

        {/* Out of Calories */}
        <div>
          <label htmlFor="outOfCaloriesBurned" className="block text-sm font-medium text-gray-700 mb-1">
            Out of Calories Burned:
          </label>
          <input
            type="number"
            id="outOfCaloriesBurned"
            {...register("outOfCaloriesBurned", {
              required: true,
              min: { value: 1, message: "Must be greater than 0" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Calories Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Calories Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${caloriesProgress}%` }}></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">{caloriesBurned}/{outOfCaloriesBurned} kcals</div>
        </div>

        {/* Steps Taken */}
        <div>
          <label htmlFor="stepsTaken" className="block text-sm font-medium text-gray-700 mb-1">
            Steps Taken:
          </label>
          <input
            type="number"
            id="stepsTaken"
            {...register("stepsTaken", {
              required: true,
              min: { value: 0, message: "Steps must be positive" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Steps Target */}
        <div>
          <label htmlFor="targetSteps" className="block text-sm font-medium text-gray-700 mb-1">
            Target Steps:
          </label>
          <input
            type="number"
            id="targetSteps"
            {...register("targetSteps", {
              required: true,
              min: { value: 1, message: "Target must be greater than 0" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Steps Progress */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Steps Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${stepsProgress}%` }}></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">{stepsTaken}/{targetSteps}</div>
        </div>

        {/* Workout Time */}
        <div>
          <label htmlFor="spendWorkoutTime" className="block text-sm font-medium text-gray-700 mb-1">
            Spend Workout Time (min):
          </label>
          <input
            type="number"
            id="spendWorkoutTime"
            {...register("spendWorkoutTime", {
              required: true,
              min: { value: 0, message: "Time must be positive" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="outOfWorkoutTime" className="block text-sm font-medium text-gray-700 mb-1">
            Out of Workout Time (min):
          </label>
          <input
            type="number"
            id="outOfWorkoutTime"
            {...register("outOfWorkoutTime", {
              required: true,
              min: { value: 1, message: "Must be greater than 0" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Workout Progress */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Workout Time Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${workoutProgress}%` }}></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">{spendWorkoutTime}/{outOfWorkoutTime} min</div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
          >
            Add Progress
          </button>
        </div>
      </form>
    </div>
  );
}

export default DailyGoals;
