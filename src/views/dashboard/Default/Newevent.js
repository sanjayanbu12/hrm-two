import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './newevent.css';
import { Button, Dialog, DialogContent, TextField, Grid, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import TextArea from 'antd/es/input/TextArea';

function Newevent() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [description, setDescription] = useState('');
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
        end: endDateTime,
        eventLink: eventLink,
        description: description
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
    setEventLink('');
    setDescription('');
  };

  const eventContent = (eventInfo) => {
    return (
      <>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.eventLink && (
          <a href={eventInfo.event.extendedProps.eventLink} target="_blank" rel="noopener noreferrer">
            {eventInfo.event.extendedProps.eventLink}
          </a>
        )}
      </>
    );
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
        eventContent={eventContent} // Custom event rendering
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
              sx={{ width: '330px', marginBottom: '16px' }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="form-group">
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
                    sx={{ width: '150px', marginBottom: '16px', marginRight: '16px' }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
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
                    sx={{ width: '150px', marginBottom: '16px' }}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="form-group">
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
                    sx={{ width: '150px', marginBottom: '16px', marginRight: '16px' }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-group">
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
                    sx={{ width: '150px' }}
                  />
                </div>
              </Grid>
            </Grid>

            <TextField
              label="Event Link"
              fullWidth
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
              sx={{ width: '330px', marginBottom: '16px' }}
            />

            <TextArea
              margin="dense"
              label="Description"
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ width: '300px', marginBottom: '16px' }}
            />
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
