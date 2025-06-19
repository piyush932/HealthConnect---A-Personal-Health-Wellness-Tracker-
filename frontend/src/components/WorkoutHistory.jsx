import React, { useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { Loader } from 'rsuite';
import 'react-toastify/dist/ReactToastify.css';

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchAllActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/activity');
      const data = await res.json();
      setWorkouts(data);
    } catch {
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const fetchByDate = async () => {
    if (!filterDate) return toast.error('Please select a date');
    setLoading(true);
    try {
      const formattedInput = formatInputDate(filterDate); // DD-MM-YYYY
      const res = await fetch(`http://localhost:8080/activity/byDate?date=${formattedInput}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setWorkouts(data);
    } catch {
      toast.error('No activity found on selected date');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/activity/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
      toast.success('Activity deleted');
    } catch {
      toast.error('Failed to delete activity');
    }
  };

  const handleEditClick = (activity) => {
    setEditId(activity._id);
    setEditData({ ...activity });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/activity/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error();
      toast.success('Activity updated');
      setWorkouts((prev) =>
        prev.map((w) => (w._id === id ? { ...w, ...editData } : w))
      );
      setEditId(null);
      setEditData({});
    } catch {
      toast.error('Failed to update activity');
    }
  };

  const formatInputDate = (isoDate) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const formatDate = (ddmmyyyy) => ddmmyyyy;

  const isToday = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    return (
      inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    fetchAllActivities();
  }, []);

  return (
    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />

      {/* Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <Calendar className="w-5 h-5 text-blue-600" />
          Select Date:
        </label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchByDate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader size="sm" />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Activity History</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 border-b">
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Workout</th>
                  <th className="py-2 px-4 font-semibold">Duration</th>
                  <th className="py-2 px-4 font-semibold">Calories</th>
                  <th className="py-2 px-4 font-semibold">Steps</th>
                  <th className="py-2 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((w) => {
                  const editable = isToday(w.date);

                  return (
                    <tr key={w._id} className="border-b">
                      <td className="py-2 px-4">{formatDate(w.date)}</td>
                      <td className="py-2 px-4">
                        {editId === w._id ? (
                          <input
                            type="text"
                            value={editData.workout}
                            onChange={(e) => handleChange('workout', e.target.value)}
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          w.workout
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === w._id ? (
                          <input
                            type="number"
                            value={editData.duration}
                            onChange={(e) =>
                              handleChange('duration', parseInt(e.target.value))
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          `${w.duration} mins`
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === w._id ? (
                          <input
                            type="number"
                            value={editData.calories}
                            onChange={(e) =>
                              handleChange('calories', parseInt(e.target.value))
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          `${w.calories} kcals`
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === w._id ? (
                          <input
                            type="number"
                            value={editData.stepsTaken}
                            onChange={(e) =>
                              handleChange('stepsTaken', parseInt(e.target.value))
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          w.stepsTaken
                        )}
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        {editable ? (
                          editId === w._id ? (
                            <>
                              <button
                                onClick={() => handleSave(w._id)}
                                className="text-green-600 hover:underline"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-500 hover:underline"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(w)}
                                className="text-blue-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(w._id)}
                                className="text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </>
                          )
                        ) : (
                          <span className="text-gray-400 italic">View only</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutHistory;
