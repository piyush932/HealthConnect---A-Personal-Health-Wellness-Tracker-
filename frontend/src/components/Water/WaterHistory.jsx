import React, { useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { Loader } from 'rsuite';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function WaterHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchAll = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/water-intake', {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      setRecords(res.data);
    } catch {
      toast.error('Failed to load water intake records');
    } finally {
      setLoading(false);
    }
  };

  const fetchByDate = async () => {
    if (!filterDate) return toast.error('Please select a date');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/water-intake/byDate?date=${filterDate}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      setRecords(res.data);
    } catch {
      toast.error('No records found on selected date');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/water-intake/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success('Record deleted');
    } catch {
      toast.error('Failed to delete record');
    }
  };

  const handleEditClick = (record) => {
    setEditId(record.id);
    setEditData({ ...record });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (value) => {
    setEditData((prev) => ({ ...prev, amountLiters: parseFloat(value) }));
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/water-intake/${id}`, editData, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Record updated');
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...editData } : r))
      );
      setEditId(null);
      setEditData({});
    } catch {
      toast.error('Failed to update record');
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const dateObj = new Date(isoDate);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const isToday = (isoDate) => {
    const today = new Date();
    const input = new Date(isoDate);
    return (
      input.getDate() === today.getDate() &&
      input.getMonth() === today.getMonth() &&
      input.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar transition={Slide} />
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">Water Intake History</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 border-b">
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Amount (Liters)</th>
                  <th className="py-2 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const editable = isToday(r.intakeDate);
                  return (
                    <tr key={r.id} className="border-b">
                      <td className="py-2 px-4">{formatDate(r.intakeDate)}</td>
                      <td className="py-2 px-4">
                        {editId === r.id ? (
                          <input
                            type="number"
                            step="0.1"
                            value={editData.amountLiters}
                            onChange={(e) => handleChange(e.target.value)}
                            className="border px-2 py-1 rounded-md"
                          />
                        ) : (
                          `${r.amountLiters} L`
                        )}
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        {editable ? (
                          editId === r.id ? (
                            <>
                              <button onClick={() => handleSave(r.id)} className="text-green-600 hover:underline">Save</button>
                              <button onClick={handleCancelEdit} className="text-gray-500 hover:underline">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEditClick(r)} className="text-blue-600 hover:underline">Edit</button>
                              <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline">Delete</button>
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

export default WaterHistory;
