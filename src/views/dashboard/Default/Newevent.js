import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './newevent.css';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function Newevent() {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Holiday",
      description: "This is a description",
      start: new Date(2022, 4, 0),
      end: new Date(2022, 4, 1),
    },
  ]);

  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    console.log(selectedDate);
    setOpen(true);
  };

  const handleCreateEvent = () => {
    if (eventTitle && startDate && endDate && startTime && endTime) {
      const startDateTime = new Date(startDate);
      const [startHours, startMinutes] = startTime.split(":");
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(endDate);
      const [endHours, endMinutes] = endTime.split(":");
      endDateTime.setHours(endHours, endMinutes);

      const newEvent = {
        id: events.length,
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
      };

      setEvents([...events, newEvent]);
    }

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setEventTitle("");
    setSelectedDate(null);
    setStartTime("");
    setEndTime("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
        selectable={true}
        dateClick={handleDateClick}
      />

      <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
          <CancelIcon className="close-icon" onClick={handleClose} />
          <h2 className="popup-title">New Event</h2>
        </DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <form className="worklog-form">
  

          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            sx={{width:'320px', marginBottom: "16px"}}
            
          />


          <div className="form-group">
              <label htmlFor="date">Start Date:</label>
              <TextField
                type="date"
                id="date"
                className="input-field"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date"> End Date:</label>
              <TextField
                type="date"
                id="date"
                className="input-field"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>


            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <TextField
                type="time"
                id="startTime"
                className="input-field"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <TextField
                type="time"
                id="endTime"
                className="input-field"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

     

            {/* <div className="form-group">
              <label htmlFor="details">Details:</label>
              <textarea
                id="details"
                rows="4"
                className="textarea-field"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              ></textarea>
            </div> */}
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button className="close-button"  onClick={handleCreateEvent}>
          Save</Button>
        </DialogActions>
      </Dialog>
      </div>
      
  );
}

export default Newevent;
