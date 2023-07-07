import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Button,InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

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
    console.log(selectedDate)
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
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
      
         <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            sx={{width:'400px'}}
          />


          <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>
          }}
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{width:'200px'}}
          />

          <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>
          }}
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{width:'200px'}}
          />

          <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>
          }}
            margin="dense"
            label="Start Time"
            fullWidth
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            sx={{width:'200px'}}
          />

          <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>
          }}
            margin="dense"
            label="End Time"
            fullWidth
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            sx={{width:'200px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateEvent}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Newevent;
