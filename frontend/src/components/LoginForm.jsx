import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Dumbbell } from "lucide-react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      const { token } = result;

      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("authChanged"));

      alert("Login successful!");
      navigate("/userprofile");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid credentials.");
    }
  };

//   const onSubmit = async (data) => {
//   // Just navigate directly without auth check
//   console.log("Form submitted with:", data);
//   alert("Login successful (dummy)!");
//   localStorage.setItem("token", "dummy-token"); // optional dummy token
//   navigate("/dashboard");
// };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl font-bold text-blue-600">HealthConnect</h1>
        </div>
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            "Know your numbers, know your results"
          </p>
        </div>

        {error && (
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Input
                label="Email:"
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is Required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <Input
                label="Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-500 absolute right-4 top-9 z-10" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-500 absolute right-4 top-9 z-10" />
                )}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            New to HealthConnect?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
