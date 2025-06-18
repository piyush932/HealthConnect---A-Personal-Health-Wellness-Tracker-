import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Flame, Footprints, Clock } from "lucide-react";

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
    },
  });

  const caloriesBurned = watch("caloriesBurned");
  const outOfCaloriesBurned = watch("outOfCaloriesBurned");
  const stepsTaken = watch("stepsTaken");
  const targetSteps = watch("targetSteps");
  const spendWorkoutTime = watch("spendWorkoutTime");
  const outOfWorkoutTime = watch("outOfWorkoutTime");

  // Progress calculations
  const caloriesProgress = Math.min((caloriesBurned / outOfCaloriesBurned) * 100, 100);
  const stepsProgress = Math.min((stepsTaken / targetSteps) * 100, 100);
  const workoutProgress = outOfWorkoutTime > 0 ? Math.min((spendWorkoutTime / outOfWorkoutTime) * 100, 100) : 0;

  // Validation logic
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

  // Submit handler: only logs data if valid
  const onSubmit = (data) => {
    if (data.stepsTaken > data.targetSteps) {
      setValue("stepsTaken", data.targetSteps);
      alert("Steps taken cannot exceed target steps. Adjusting value.");
      return;
    }
    if (data.caloriesBurned > data.outOfCaloriesBurned) {
      setValue("caloriesBurned", data.outOfCaloriesBurned);
      alert("Calories burned cannot exceed out of calories burned. Adjusting value.");
      return;
    }
    if (data.spendWorkoutTime > data.outOfWorkoutTime) {
      setValue("spendWorkoutTime", data.outOfWorkoutTime);
      alert("Workout time cannot exceed out of workout time. Adjusting value.");
      return;
    }
    console.log(data);
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {errors.caloriesBurned && (
            <p className="mt-1 text-sm text-red-500">{errors.caloriesBurned.message}</p>
          )}
        </div>

        {/* Out of Calories Burned Input */}
        <div>
          <label htmlFor="outOfCaloriesBurned" className="block text-sm font-medium text-gray-700 mb-1">
            <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Out of Calories Burned:
          </label>
          <input
            type="number"
            id="outOfCaloriesBurned"
            {...register("outOfCaloriesBurned", {
              required: "Out of Calories burned is required",
              min: { value: 0, message: "Out of Calories must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Calories Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Calories Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${caloriesProgress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {caloriesBurned}/{outOfCaloriesBurned} kcals
          </div>
        </div>

        {/* Steps Taken Input */}
        <div>
          <label htmlFor="stepsTaken" className="block text-sm font-medium text-gray-700 mb-1">
            <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Steps Taken:
          </label>
          <input
            type="number"
            id="stepsTaken"
            {...register("stepsTaken", {
              required: "Steps Taken is required",
              min: { value: 0, message: "Steps must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.stepsTaken && (
            <p className="mt-1 text-sm text-red-500">{errors.stepsTaken.message}</p>
          )}
        </div>

        {/* Steps Target Input */}
        <div>
          <label htmlFor="targetSteps" className="block text-sm font-medium text-gray-700 mb-1">
            <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Steps Target:
          </label>
          <input
            type="number"
            id="targetSteps"
            {...register("targetSteps", {
              required: "Steps target is required",
              min: { value: 1, message: "Steps target must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.targetSteps && (
            <p className="mt-1 text-sm text-red-500">{errors.targetSteps.message}</p>
          )}
        </div>

        {/* Steps Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Steps Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${stepsProgress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {stepsTaken}/{targetSteps}
          </div>
        </div>

        {/* Spend Workout Time Input */}
        <div>
          <label htmlFor="spendWorkoutTime" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Spend Workout Time (minutes):
          </label>
          <input
            type="number"
            id="spendWorkoutTime"
            {...register("spendWorkoutTime", {
              required: "Workout time is required",
              min: { value: 0, message: "Workout time must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.spendWorkoutTime && (
            <p className="mt-1 text-sm text-red-500">{errors.spendWorkoutTime.message}</p>
          )}
        </div>

        {/* Out of Workout Time Input */}
        <div>
          <label htmlFor="outOfWorkoutTime" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Out of Workout Time (minutes):
          </label>
          <input
            type="number"
            id="outOfWorkoutTime"
            {...register("outOfWorkoutTime", {
              required: "Total workout time is required",
              min: { value: 0, message: "Workout time must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.outOfWorkoutTime && (
            <p className="mt-1 text-sm text-red-500">{errors.outOfWorkoutTime.message}</p>
          )}
        </div>

        {/* Workout Time Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Workout Time Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${workoutProgress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {spendWorkoutTime}/{outOfWorkoutTime} minutes
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Progress
          </button>
        </div>
      </form>
    </div>
  );
}

export default DailyGoals;
