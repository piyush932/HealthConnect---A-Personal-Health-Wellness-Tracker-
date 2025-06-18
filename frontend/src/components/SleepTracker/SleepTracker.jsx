import React, { useState } from "react";
import "./SleepTracker.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";

// Dialog styling
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const SleepTracker = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime1, setSelectedTime1] = useState(""); // Wake time
  const [selectedTime2, setSelectedTime2] = useState(""); // Sleep time

  // TODO: Remove this dummy data before production
  const [entries, setEntries] = useState([
    { date: "2025-06-01", sleep: "23:00", wake: "07:00", duration: "8 hrs" },
    { date: "2025-06-02", sleep: "22:30", wake: "06:30", duration: "8 hrs" },
    { date: "2025-06-03", sleep: "00:00", wake: "07:00", duration: "7 hrs" },
    { date: "2025-06-04", sleep: "22:45", wake: "06:15", duration: "7 hrs" },
    { date: "2025-06-05", sleep: "23:30", wake: "07:30", duration: "8 hrs" },
    { date: "2025-06-06", sleep: "22:15", wake: "05:45", duration: "7 hrs" },
    { date: "2025-06-07", sleep: "21:45", wake: "06:00", duration: "8 hrs" },
    { date: "2025-06-08", sleep: "00:15", wake: "08:00", duration: "8 hrs" },
    { date: "2025-06-09", sleep: "23:10", wake: "06:10", duration: "7 hrs" },
    { date: "2025-06-10", sleep: "22:00", wake: "05:00", duration: "7 hrs" },
    { date: "2025-06-11", sleep: "23:55", wake: "06:55", duration: "7 hrs" },
    { date: "2025-06-12", sleep: "00:30", wake: "08:30", duration: "8 hrs" },
    { date: "2025-06-13", sleep: "22:50", wake: "06:50", duration: "8 hrs" },
  ]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveEntry = () => {
    if (!selectedDate || !selectedTime1 || !selectedTime2) return;

    const sleepTime = dayjs(selectedTime2, "HH:mm");
    const wakeTime = dayjs(selectedTime1, "HH:mm");

    let duration = wakeTime.diff(sleepTime, "hour");
    if (duration < 0) duration += 24;

    const newEntry = {
      date: selectedDate,
      sleep: selectedTime2,
      wake: selectedTime1,
      duration: `${duration} hrs`,
    };

    setEntries([...entries, newEntry]);
    setSelectedDate("");
    setSelectedTime1("");
    setSelectedTime2("");
    setOpen(false);
  };

  const handleDeleteEntry = (indexToDelete) => {
    const updatedEntries = entries.filter((_, idx) => idx !== indexToDelete);
    setEntries(updatedEntries);
  };

  const handleDateChange = (e) => {
    const formatDate = new Date(e.target.value);
    const formatted = formatDate.toLocaleDateString("fr-CA");
    setSelectedDate(formatted);
  };

  const handleTimeChange1 = (e) => setSelectedTime1(e.target.value);
  const handleTimeChange2 = (e) => setSelectedTime2(e.target.value);

  const chartData = entries.map((entry, index) => ({
    name: entry.date,
    uv: parseInt(entry.duration),
    amt: index + 1,
  }));

  return (
  <div className="sleep-main">
    <div className="sleep-container">
      <p className="sleep-title">Daily Sleep Tracker</p>

      <div className="sleep-add-btn">
        <Button
          variant="contained"
          className="sleep-new-btn1"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#5795FA",
            borderRadius: 50,
            fontFamily: "Inter, sans-serif",
          }}
        >
          New Entry
        </Button>

        <BootstrapDialog
          onClose={handleClose}
          open={open}
          aria-labelledby="customized-dialog-title"
        >
          <BootstrapDialogTitle onClose={handleClose}>
            <strong>Fill Your Details</strong>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="sleep-input-group">
                &nbsp;<label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  className="sleep-input"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="sleep-input-group">
                &nbsp;<label htmlFor="wakeup">Wake up time</label>
                <input
                  type="time"
                  name="wakeuptime"
                  className="sleep-input"
                  value={selectedTime1}
                  onChange={handleTimeChange1}
                />
              </div>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="sleep-input-group">
                &nbsp;<label htmlFor="sleeptime">Sleep time</label>
                <input
                  type="time"
                  name="sleeptime"
                  className="sleep-input"
                  value={selectedTime2}
                  onChange={handleTimeChange2}
                />
              </div>
            </LocalizationProvider>
          </DialogContent>

          <div className="sleep-save-btn" style={{ marginBottom: "3%" }}>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleSaveEntry}
                sx={{
                  backgroundColor: "#5795FA",
                  borderRadius: 5,
                  fontFamily: "Inter, sans-serif",
                  marginTop: "4%",
                }}
              >
                Save
              </Button>
            </DialogActions>
          </div>
        </BootstrapDialog>
      </div>

      <div className="sleep-statistics">
        <div className="sleep-duration">
          <div className="sleep-duration-title">
            <p className="sleep-title">Sleep Duration</p>
          </div>
          <div className="sleep-duration-graph">
            <AreaChart
              width={320}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis dataKey="uv" axisLine={false} tickLine={false} />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#ccdbef"
              />
            </AreaChart>
          </div>
        </div>

        <div className="sleep-stats">
          <div className="sleep-stats-title">
            <p className="sleep-title">Sleep Stats</p>
          </div>
          <div className="sleep-container-table">
            <table className="sleep-main-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time of sleep</th>
                  <th>Wake up time</th>
                  <th>Sleep duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? (
                  entries.map((entry, idx) => (
                    <tr key={idx}>
                      <td>{entry.date}</td>
                      <td>{entry.sleep}</td>
                      <td>{entry.wake}</td>
                      <td>{entry.duration}</td>
                      <td>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteEntry(idx)}
                          size="small"
                          sx={{ fontSize: "0.7rem", padding: "2px 8px" }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No entries yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default SleepTracker;
