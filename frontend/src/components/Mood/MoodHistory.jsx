import React, { useState, useEffect } from "react";
import { Calendar, Search } from "lucide-react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { Loader } from "rsuite";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Emoji + label map
const moodMap = {
  1: { emoji: "😞", label: "Very Sad" },
  2: { emoji: "😕", label: "Sad" },
  3: { emoji: "😐", label: "Neutral" },
  4: { emoji: "🙂", label: "Happy" },
  5: { emoji: "😄", label: "Very Happy" },
};

function MoodHistory() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  const token = localStorage.getItem("token");

  const fetchAllMoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/mood", {
        headers: { Authorization: "Bearer " + token },
      });
      setMoods(res.data);
    } catch {
      toast.error("Failed to load moods");
    } finally {
      setLoading(false);
    }
  };

  const fetchByDate = async () => {
    if (!filterDate) return toast.error("Please select a date");
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/mood/byDate?date=${filterDate}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setMoods(res.data);
    } catch {
      toast.error("No mood entries found on selected date");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/mood/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setMoods((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mood entry deleted");
    } catch {
      toast.error("Failed to delete mood");
    }
  };

  const handleEditClick = (mood) => {
    setEditId(mood.id);
    setEditData({ ...mood });
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
      await axios.put(`http://localhost:8080/mood/${id}`, editData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("Mood entry updated");
      setMoods((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...editData } : m))
      );
      setEditId(null);
      setEditData({});
    } catch {
      toast.error("Failed to update mood");
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const isToday = (isoDate) => {
    const today = new Date();
    const input = new Date(isoDate);
    return (
      today.getFullYear() === input.getFullYear() &&
      today.getMonth() === input.getMonth() &&
      today.getDate() === input.getDate()
    );
  };

  useEffect(() => {
    fetchAllMoods();
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 mt-8 rounded-lg shadow-md max-w-7xl mx-auto">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-[999] flex justify-center px-4 overflow-y-auto py-10">
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              {isEditingNote ? "Edit Note" : "Note"}
            </h2>

            <div className="max-h-[60vh] overflow-y-auto">
              {isEditingNote ? (
                <textarea
                  rows="10"
                  className="w-full border p-2 rounded-md focus:outline-none resize-none"
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {modalContent}
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2 flex-wrap">
              {isEditingNote && (
                <button
                  onClick={() => {
                    setEditData((prev) => ({ ...prev, notes: modalContent }));
                    setShowNotesModal(false);
                    setIsEditingNote(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => {
                  setShowNotesModal(false);
                  setIsEditingNote(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
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
          <Loader size="md" />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Mood History</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 border-b">
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Mood</th>
                  <th className="py-2 px-4 font-semibold">Notes</th>
                  <th className="py-2 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {moods.map((m) => {
                  const editable = isToday(m.entryDate);
                  return (
                    <tr key={m.id} className="border-b">
                      <td className="py-2 px-4">{formatDate(m.entryDate)}</td>
                      <td className="py-2 px-4">
                        {editId === m.id ? (
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={editData.moodRating}
                            onChange={(e) =>
                              handleChange("moodRating", parseInt(e.target.value))
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          <span>
                            {moodMap[m.moodRating]?.emoji} {moodMap[m.moodRating]?.label}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === m.id ? (
                          <button
                            onClick={() => {
                              setModalContent(editData.notes || "");
                              setIsEditingNote(true);
                              setShowNotesModal(true);
                            }}
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            Edit Notes
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setModalContent(m.notes || "No notes");
                              setShowNotesModal(true);
                            }}
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Notes
                          </button>
                        )}
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        {editable ? (
                          editId === m.id ? (
                            <>
                              <button
                                onClick={() => handleSave(m.id)}
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
                                onClick={() => handleEditClick(m)}
                                className="text-blue-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(m.id)}
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

export default MoodHistory;
