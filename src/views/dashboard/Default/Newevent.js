import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './newevent.css';
import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function Newevent() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const now = new Date();
    const upcoming = events.filter((event) => {
      const eventStartDate = new Date(event.start);
      return eventStartDate >= now;
    });
    setUpcomingEvents(upcoming);
  }, [events]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    console.log(selectedDate);
    setOpen(true);
  };

  const handleCreateEvent = () => {
    if (eventTitle && startDate && endDate && startTime && endTime) {
      const startDateTime = new Date(startDate);
      const [startHours, startMinutes] = startTime.split(':');
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(endDate);
      const [endHours, endMinutes] = endTime.split(':');
      endDateTime.setHours(endHours, endMinutes);

      const newEvent = {
        id: events.length,
        title: eventTitle,
        start: startDateTime,
        end: endDateTime
      };

      setEvents([...events, newEvent]);
    }

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setEventTitle('');
    setSelectedDate(null);
    setStartTime('');
    setEndTime('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height={'90vh'}
        events={upcomingEvents}
        selectable={true}
        dateClick={handleDateClick}
      />

      <Dialog open={open} onClose={handleClose}>
        <CancelIcon className="close-icon" onClick={handleClose} />
        <h2 className="popup-title">New Event</h2>
        <DialogContent sx={{ width: '400px' }}>
          <form className="worklog-form">
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              fullWidth
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              sx={{ width: '320px', marginBottom: '16px' }}
            />

            <div className="form-group">
              <label htmlFor="date">Start Date:</label>
              <input type="date" id="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="date"> End Date:</label>
              <input type="date" id="date" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input type="time" id="startTime" className="input-field" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time:</label>
              <input type="time" id="endTime" className="input-field" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </form>
        </DialogContent>
        <Button className="close-button" onClick={handleCreateEvent}>
          Save
        </Button>
      </Dialog>
    </div>
  );
}

export default Newevent;
