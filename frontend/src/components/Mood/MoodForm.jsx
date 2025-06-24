import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Smile, StickyNote } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const moodMap = {
  1: {
    emoji: '😞',
    label: 'Very Sad',
    desc: 'Feeling overwhelmed, anxious, or deeply unhappy. Emotionally drained or isolated.',
  },
  2: {
    emoji: '😕',
    label: 'Sad / Low',
    desc: 'Feeling off, confused, or disappointed. Not terrible, but mentally down.',
  },
  3: {
    emoji: '😐',
    label: 'Neutral / Meh',
    desc: 'Neither happy nor sad. A flat or uneventful day with no strong emotions.',
  },
  4: {
    emoji: '🙂',
    label: 'Happy / Calm',
    desc: 'Feeling light, productive, and in control. Optimistic and emotionally balanced.',
  },
  5: {
    emoji: '😄',
    label: 'Very Happy',
    desc: 'Energetic, grateful, and joyful. Inspired and emotionally refreshed.',
  },
};

const DEFAULT_MOOD = 3;

function MoodForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      moodRating: DEFAULT_MOOD,
    },
  });

  const moodRating = watch('moodRating');

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8080/mood', data, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Mood entry added successfully!');
      reset({ moodRating: DEFAULT_MOOD });
    } catch (error) {
      console.error('Error logging mood:', error);
      toast.error(error.response?.data?.message || 'Failed to log mood.');
    }
  };

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />

      <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Log Your Mood</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Metrics and Description */}
        <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Why Mood Tracking Matters 🧠</h3>
          <p className="text-gray-700 mb-4">
            Your mood affects your mental, emotional, and physical health. Tracking emotions over time can help uncover triggers, prevent burnout, and improve resilience.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Anger & Chronic Stress:</strong> Persistent anger increases risk of anxiety and heart disease by <span className="text-blue-600 font-semibold">44%</span>.</li>
            <li><strong>Sadness & Depression:</strong> People who report regular sadness are <span className="text-blue-600 font-semibold">3× more likely</span> to develop clinical depression within a year.</li>
            <li><strong>Untracked Mood Swings:</strong> Emotional instability raises risk of bipolar conditions by <span className="text-blue-600 font-semibold">70%</span>.</li>
            <li><strong>Suppressed Emotions:</strong> Suppressing emotions increases cortisol by <span className="text-blue-600 font-semibold">30%</span>, weakening your immune system.</li>
            <li><strong>Mood Journaling:</strong> Daily mood tracking improves emotional awareness and regulation by <span className="text-blue-600 font-semibold">40–60%</span>.</li>
          </ul>
          <p className="mt-4 text-gray-700">
            📈 Logging your mood daily is a simple habit that creates long-term emotional clarity and stability.
          </p>
        </div>

        {/* Right Column: Mood Logging Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Date */}
          <div>
            <label htmlFor="entryDate" className="block text-sm font-medium text-gray-700 mb-1">
              <CalendarIcon className="inline-block mr-2 h-5 w-5" />
              Date:
            </label>
            <input
              type="date"
              id="entryDate"
              {...register('entryDate', { required: 'Date is required' })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.entryDate && <p className="text-sm text-red-500">{errors.entryDate.message}</p>}
          </div>

          {/* Mood Rating */}
          <div>
            <label htmlFor="moodRating" className="block text-sm font-medium text-gray-700 mb-1">
              <Smile className="inline-block mr-2 h-5 w-5" />
              Mood Rating (1–5):
            </label>

            <div className="flex justify-between text-xl px-1 pt-2">
              <span>😞</span>
              <span>😕</span>
              <span>😐</span>
              <span>🙂</span>
              <span>😄</span>
            </div>

            <input
              aria-label="Mood Rating Slider"
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

            <div className="text-center mt-2 text-lg font-medium text-gray-700">
              <span className="text-2xl">{moodMap[moodRating]?.emoji}</span>{' '}
              <span>{moodMap[moodRating]?.label}</span>
            </div>
            <div className="text-center text-sm text-gray-500 italic mt-1 px-2">
              {moodMap[moodRating]?.desc}
            </div>

            {errors.moodRating && (
              <p className="text-sm text-red-500">{errors.moodRating.message}</p>
            )}
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
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={() => reset({ moodRating: DEFAULT_MOOD })}
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
    </div>
  );
}

export default MoodForm;
