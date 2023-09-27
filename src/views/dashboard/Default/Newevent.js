import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './newevent.css';
import { Button, Dialog, DialogContent, TextField, Grid, InputAdornment, MenuItem, Select, FormControl, InputLabel ,Card} from '@mui/material';
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
  const [location, setLocation] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  console.log(selectedDate);
  
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
    setOpen(true);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
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
        location: location,
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
    setLocation('');
    setDescription('');
  };
  const locationNames = {
    location1: 'Coimbatore',
    location2: 'Bangalore',
    location3: 'Chennai'
  };

  const eventContent = (eventInfo) => {
    return (
      <>
        <div>{eventInfo.timeText}</div>
        <div style={{ color: '#ffffff' }}>{eventInfo.event.title}</div>
        {eventInfo.event.extendedProps.location && (
          <div style={{ color: '#ffffff' }}>{locationNames[eventInfo.event.extendedProps.location]}</div>
        )}
        {eventInfo.event.extendedProps.eventLink && (
          <a href={eventInfo.event.extendedProps.eventLink} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff' }}>
            {eventInfo.event.extendedProps.eventLink}
          </a>
        )}
      </>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px', marginBottom: '15px' }}>
        <div>
          {/* <Button
              onClick={() => navigate('/dashboard/default')}
              variant="contained"
              color="secondary"
              endIcon={<KeyboardDoubleArrowRightIcon />}
            >
              Back 
            </Button> */}
        </div>
      </div>
      <Card elevation={3}>
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
          editable
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
                sx={{ width: '335px', marginBottom: '12px' }}
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
                      sx={{ width: '150px', marginRight: '16px' }}
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
                      sx={{ width: '150px' }}
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
                      sx={{ width: '150px', marginRight: '16px' }}
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
                sx={{ width: '335px', marginBottom: '12px' }}
              />

              <FormControl fullWidth sx={{ width: '335px', marginBottom: '12px' }}>
                <InputLabel id="location-label">Location</InputLabel>
                <Select labelId="location-label" value={location} onChange={handleLocationChange} label="Location">
                  <MenuItem value="location1">Coimbatore</MenuItem>
                  <MenuItem value="location2">Bangalore</MenuItem>
                  <MenuItem value="location3">Chennai</MenuItem>
                </Select>
              </FormControl>
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
      </Card>
    </div>
  );
}

export default Newevent;
