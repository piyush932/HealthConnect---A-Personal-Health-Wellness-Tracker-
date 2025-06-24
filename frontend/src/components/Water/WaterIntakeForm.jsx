import React from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, Droplet } from "lucide-react";
import { toast, ToastContainer, Slide } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function WaterIntakeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8080/water", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Water intake logged successfully!");
      reset();
    } catch (error) {
      console.error("Error logging water intake:", error);
      toast.error(
        error.response?.data?.message || "Failed to log water intake."
      );
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        transition={Slide}
      />
      <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">
        Log Your Water Intake
      </h2>

      {/* Responsive Grid: Description | Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Description */}
        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Why Water Intake Matters 💧
          </h3>
          <p className="text-gray-700 mb-4">
            Staying hydrated is not just about quenching thirst — it’s vital for
            nearly every function in your body. Regular and adequate water
            intake has been shown to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Improve Brain Function:</strong> Just 1–3% dehydration can
              impair mood, memory, and concentration.
            </li>
            <li>
              <strong>Support Weight Loss:</strong> Drinking water before meals
              may increase satiety and boost metabolism by up to 30%.
            </li>
            <li>
              <strong>Enhance Physical Performance:</strong> Proper hydration
              improves endurance and reduces fatigue during workouts.
            </li>
            <li>
              <strong>Prevent Kidney Stones:</strong> Increased fluid intake can
              reduce kidney stone risk by up to 60%.
            </li>
            <li>
              <strong>Extend Lifespan:</strong> A 25-year NIH study found adults
              who stay well-hydrated have a{" "}
              <span className="text-blue-600 font-semibold">
                20–30% lower risk
              </span>{" "}
              of chronic diseases and may live longer.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            💡 Logging your water daily helps you build consistent habits and
            ensures you're hitting your hydration goals to stay energized,
            focused, and healthy.
          </p>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Intake Date */}
          <div>
            <label
              htmlFor="intakeDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <CalendarIcon className="inline-block mr-2 h-5 w-5" />
              Date:
            </label>
            <input
              type="date"
              id="intakeDate"
              {...register("intakeDate", { required: "Date is required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.intakeDate && (
              <p className="text-sm text-red-500">
                {errors.intakeDate.message}
              </p>
            )}
          </div>

          {/* Amount Liters */}
          <div>
            <label
              htmlFor="amountInLiters"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <Droplet className="inline-block mr-2 h-5 w-5" />
              Amount (Liters):
            </label>
            <input
              type="number"
              id="amountInLiters"
              step="0.1"
              {...register("amountInLiters", {
                required: "Amount is required",
                min: {
                  value: 0.1,
                  message: "Minimum intake should be 0.1 liters",
                },
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2.5"
            />
            {errors.amountInLiters && (
              <p className="text-sm text-red-500">
                {errors.amountInLiters.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-2">
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

export default WaterIntakeForm;
