import React from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "./Input";
import { Dumbbell } from "lucide-react";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        reset(); // Clear form
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center items-center">
          <Dumbbell className="h-14 w-14 mr-3 text-blue-600" />
          <h1 className="text-5xl font-extrabold text-blue-600">
            HealthConnect
          </h1>
        </div>
        <div>
          <h2 className="mt-5 text-center text-2xl font-bold text-gray-900">
            Start Your Fitness Journey
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Unlock personalized workouts and track your progress
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Input
                label="Name:"
                placeholder="Enter your Name"
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Email:"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email must be valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                label="Password:"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-500 absolute right-4 top-9 z-10" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-500 absolute right-4 top-9 z-10" />
                )}
              </button>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Age:"
                type="number"
                placeholder="Your age"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 1, message: "Age must be positive" },
                  valueAsNumber: true,
                })}
              />
              {errors.age && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Weight (kg):"
                type="number"
                placeholder="Your weight in kg"
                {...register("weight", {
                  required: "Weight is required",
                  min: { value: 1, message: "Weight must be positive" },
                  valueAsNumber: true,
                })}
              />
              {errors.weight && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Height (inches):"
                type="number"
                step="0.1"
                placeholder="Your height in inches"
                {...register("height", {
                  required: "Height is required",
                  min: { value: 1, message: "Height must be positive" },
                  valueAsNumber: true,
                })}
              />
              {errors.height && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.height.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Join Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
