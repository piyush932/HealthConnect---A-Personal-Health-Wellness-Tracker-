import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Clock, Star, StickyNote } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function SleepForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();



  const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem('token');

    const payload = {
      sleepDate: data.sleepDate,
      sleepStartTime: data.startTime,
      sleepEndTime: data.endTime,
      qualityRating: data.qualityRating,
      notes: data.notes
    };

    await axios.post('http://localhost:8080/sleep', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    toast.success('Sleep entry added successfully!');
    reset();
  } catch (error) {
    console.error('Error adding sleep entry:', error);
    toast.error(error.response?.data?.message || 'Failed to add sleep entry.');
  }
};


  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Add Sleep Entry</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Date */}
        <div>
          <label htmlFor="sleepDate" className="block text-sm font-medium text-gray-700 mb-1">
            <CalendarIcon className="inline-block mr-2 h-5 w-5" />
            Date:
          </label>
          <input
            type="date"
            id="sleepDate"
            {...register("sleepDate", { required: "Date is required" })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.sleepDate && <p className="text-sm text-red-500">{errors.sleepDate.message}</p>}
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5" />
            Sleep Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            {...register("startTime", { required: "Start time is required" })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.startTime && <p className="text-sm text-red-500">{errors.startTime.message}</p>}
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5 rotate-180" />
            Sleep End Time:
          </label>
          <input
            type="time"
            id="endTime"
            {...register("endTime", { required: "End time is required" })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.endTime && <p className="text-sm text-red-500">{errors.endTime.message}</p>}
        </div>

        {/* Quality Rating */}
        <div>
          <label htmlFor="qualityRating" className="block text-sm font-medium text-gray-700 mb-1">
            <Star className="inline-block mr-2 h-5 w-5" />
            Quality Rating (1–5):
          </label>
          <input
            type="number"
            id="qualityRating"
            {...register("qualityRating", {
              required: "Quality rating is required",
              min: { value: 1, message: "Minimum rating is 1" },
              max: { value: 5, message: "Maximum rating is 5" },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 4"
          />
          {errors.qualityRating && <p className="text-sm text-red-500">{errors.qualityRating.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            <StickyNote className="inline-block mr-2 h-5 w-5" />
            Notes:
          </label>
          <textarea
            id="notes"
            rows="3"
            {...register("notes")}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Woke up once at night"
          ></textarea>
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

export default SleepForm;
