import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';

function UserProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId"); // Replace this with the correct way to get user ID
  const API_URL = `http://localhost:8080/user/me/${userId}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();

        reset({
          name: userData.name || "",
          age: userData.age || "",
          weight: userData.weight || "",
          hight: userData.hight || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Failed to load user data.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [reset, API_URL, userId]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update user data");

      setMessage("Profile updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Update failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
          <User size={64} className="text-indigo-600" />
        </div>
      </div>

      {message && <p className="mb-4 text-center text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            id="name"
            disabled={!isEditable}
            {...register("name", { required: "Name is required" })}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
              isEditable ? "focus:ring-blue-500" : "bg-gray-100"
            }`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Age and Weight */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age:</label>
            <input
              type="number"
              id="age"
              disabled={!isEditable}
              {...register("age", {
                required: "Age is required",
                min: { value: 1, message: "Age must be positive" },
                valueAsNumber: true,
              })}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                isEditable ? "focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
            {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
          </div>

          <div className="flex-1">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (KG):</label>
            <input
              type="number"
              id="weight"
              disabled={!isEditable}
              {...register("weight", {
                required: "Weight is required",
                min: { value: 1, message: "Weight must be positive" },
                valueAsNumber: true,
              })}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                isEditable ? "focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
            {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>}
          </div>
        </div>

        {/* Height */}
        <div>
          <label htmlFor="hight" className="block text-sm font-medium text-gray-700 mb-1">Height (Inches):</label>
          <input
            type="number"
            step="0.1"
            id="hight"
            disabled={!isEditable}
            {...register("hight", {
              required: "Height is required",
              min: { value: 1, message: "Height must be positive" },
              valueAsNumber: true,
            })}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
              isEditable ? "focus:ring-blue-500" : "bg-gray-100"
            }`}
          />
          {errors.hight && <p className="text-sm text-red-500 mt-1">{errors.hight.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          {!isEditable && (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Edit
            </button>
          )}

          {isEditable && (
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserProfileForm;
