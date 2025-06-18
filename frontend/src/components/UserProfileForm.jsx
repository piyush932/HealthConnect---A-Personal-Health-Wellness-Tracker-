import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';

function UserProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data); 
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
          <User size={64} className="text-indigo-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age:</label>
            <input
              type="number"
              id="age"
              {...register("age", {
                required: "Age is required",
                min: { value: 1, message: "Age must be positive" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight KG:</label>
            <input
              type="number"
              id="weight"
              {...register("weight", {
                required: "Weight is required",
                min: { value: 1, message: "Weight must be positive" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="hight" className="block text-sm font-medium text-gray-700 mb-1">Height Inches:</label>
          <input
            type="number"
            id="hight"
            step="0.1"
            {...register("hight", {
              required: "Height is required",
              min: { value: 1, message: "Height must be positive" },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.hight && <p className="mt-1 text-sm text-red-500">{errors.hight.message}</p>}
        </div>

        <div>
          <label htmlFor="fitnessGoals" className="block text-sm font-medium text-gray-700 mb-1">Fitness Goal:</label>
          <input
            id="fitnessGoals"
            placeholder="e.g. Weight Gain"
            {...register("fitnessGoals", { required: "Fitness goal is required" })}
            className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fitnessGoals && <p className="mt-1 text-sm text-red-500">{errors.fitnessGoals.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileForm;
