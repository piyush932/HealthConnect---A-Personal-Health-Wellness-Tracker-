import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Smile, StickyNote } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function MoodForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8080/mood', data, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Mood entry added successfully!');
      reset();
    } catch (error) {
      console.error('Error logging mood:', error);
      toast.error(error.response?.data?.message || 'Failed to log mood.');
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Log Your Mood</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Date */}
        <div>
          <label htmlFor="moodDate" className="block text-sm font-medium text-gray-700 mb-1">
            <CalendarIcon className="inline-block mr-2 h-5 w-5" />
            Date:
          </label>
          <input
            type="date"
            id="moodDate"
            {...register('moodDate', { required: 'Date is required' })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.moodDate && <p className="text-sm text-red-500">{errors.moodDate.message}</p>}
        </div>

        {/* Mood Rating */}
        <div>
          <label htmlFor="moodRating" className="block text-sm font-medium text-gray-700 mb-1">
            <Smile className="inline-block mr-2 h-5 w-5" />
            Mood Rating (1-5):
          </label>
          <input
            type="range"
            id="moodRating"
            min="1"
            max="5"
            {...register('moodRating', {
              required: 'Mood rating is required',
              valueAsNumber: true,
            })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>😞</span>
            <span>😐</span>
            <span>😊</span>
          </div>
          {errors.moodRating && <p className="text-sm text-red-500">{errors.moodRating.message}</p>}
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
            {...register('notes')}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Any thoughts you'd like to add?"
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
            Log Mood
          </button>
        </div>
      </form>
    </div>
  );
}

export default MoodForm;
