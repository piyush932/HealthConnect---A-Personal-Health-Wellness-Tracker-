import React, { useState, useEffect } from "react";
import { Calendar, Search } from "lucide-react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { Loader } from "rsuite";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function SleepHistory() {
  const [sleeps, setSleeps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  const token = localStorage.getItem("token");

  const fetchAllSleeps = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/sleep", {
        headers: { Authorization: "Bearer " + token },
      });
      setSleeps(res.data);
    } catch {
      toast.error("Failed to load sleep records");
    } finally {
      setLoading(false);
    }
  };

  const fetchByDate = async () => {
    if (!filterDate) return toast.error("Please select a date");
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/sleep/byDate?date=${filterDate}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setSleeps(res.data);
    } catch {
      toast.error("No sleep data found on selected date");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (entry) => {
    setEditId(entry.id);
    setEditData({ ...entry });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateSleepHours = (start, end) => {
    if (!start || !end) return 0;
    const [sh, sm, ss] = start.split(":").map(Number);
    const [eh, em, es] = end.split(":").map(Number);
    let startMins = sh * 60 + sm;
    let endMins = eh * 60 + em;
    let diff = endMins - startMins;
    if (diff < 0) diff += 24 * 60;
    return (diff / 60).toFixed(1);
  };

  const handleSave = async (id) => {
    const updatedSleepHours = calculateSleepHours(
      editData.sleepStartTime,
      editData.sleepEndTime
    );

    const updatedEntry = {
      ...editData,
      sleepHours: updatedSleepHours,
    };

    try {
      await axios.put(`http://localhost:8080/sleep/${id}`, updatedEntry, {
        headers: { Authorization: "Bearer " + token },
      });

      setSleeps((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updatedEntry } : s))
      );
      toast.success("Sleep entry updated");
    } catch {
      toast.error("Failed to update sleep entry");
    }

    setEditId(null);
    setEditData({});
  };

  const formatDate = (isoDate) => {
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
    fetchAllSleeps();
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Sleep History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 border-b">
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Start</th>
                  <th className="py-2 px-4 font-semibold">End</th>
                  <th className="py-2 px-4 font-semibold">Hours</th>
                  <th className="py-2 px-4 font-semibold">Rating</th>
                  <th className="py-2 px-4 font-semibold">Notes</th>
                  <th className="py-2 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sleeps.map((s) => {
                  const editable = isToday(s.sleepDate);
                  return (
                    <tr key={s.id} className="border-b">
                      <td className="py-2 px-4">{formatDate(s.sleepDate)}</td>
                      <td className="py-2 px-4">
                        {editId === s.id ? (
                          <input
                            type="time"
                            value={editData.sleepStartTime}
                            onChange={(e) =>
                              handleChange("sleepStartTime", e.target.value)
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          s.sleepStartTime
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === s.id ? (
                          <input
                            type="time"
                            value={editData.sleepEndTime}
                            onChange={(e) =>
                              handleChange("sleepEndTime", e.target.value)
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          s.sleepEndTime
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === s.id
                          ? `${calculateSleepHours(
                              editData.sleepStartTime,
                              editData.sleepEndTime
                            )} hrs`
                          : `${calculateSleepHours(
                              s.sleepStartTime,
                              s.sleepEndTime
                            )} hrs`}
                      </td>
                      <td className="py-2 px-4">
                        {editId === s.id ? (
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={editData.qualityRating}
                            onChange={(e) =>
                              handleChange("qualityRating", e.target.value)
                            }
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          s.qualityRating
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editId === s.id ? (
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
                              setModalContent(s.notes || "No notes");
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
                          editId === s.id ? (
                            <>
                              <button
                                onClick={() => handleSave(s.id)}
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
                            <button
                              onClick={() => handleEditClick(s)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                          )
                        ) : (
                          <span className="text-gray-400 italic">
                            View only
                          </span>
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

export default SleepHistory;
