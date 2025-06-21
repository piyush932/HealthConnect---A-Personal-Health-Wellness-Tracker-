import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Droplet } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function WaterIntakeForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/water', data, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Water intake logged successfully!');
      reset();
    } catch (error) {
      console.error('Error logging water intake:', error);
      toast.error(error.response?.data?.message || 'Failed to log water intake.');
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Log Water Intake</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            <CalendarIcon className="inline-block mr-2 h-5 w-5" />
            Date:
          </label>
          <input
            type="date"
            id="date"
            {...register("waterDate", { required: "Date is required" })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.waterDate && <p className="text-sm text-red-500">{errors.waterDate.message}</p>}
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            <Droplet className="inline-block mr-2 h-5 w-5" />
            Amount (Liters or Cups):
          </label>
          <input
            type="number"
            step="0.1"
            id="amount"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 0.1, message: "Amount must be greater than 0" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 2.5"
          />
          {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
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
  );
}

export default WaterIntakeForm;
