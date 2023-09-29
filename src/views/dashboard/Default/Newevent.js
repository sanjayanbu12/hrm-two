import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import { TextField, Grid, InputAdornment } from '@mui/material';
import axios from 'axios';

const Newevent = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setname] = useState('');
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };
  const handleSelect = (info) => {
    const { start, end } = info;
    setEventStartDate(start.toISOString());
    setEventEndDate(end.toISOString());
    setVisible(true);
  };
  useEffect(async () => {
    const response = await axios.get('https://hrm-backend-square.onrender.com/event/getall');
    console.log(response.data.data);
    if (response.data.data) {
      const fetchedEvents = response.data.data.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate, 
      }));

      setEvents(fetchedEvents);
    }
  }, []);
  const handleSubmitEvent = async () => {
    if (name && eventStartDate && eventEndDate) {
      const Eventdata = {
        startDate: eventStartDate,
        endDate: eventEndDate,
        title: name,
        startTime: startTime,
        endTime: endTime
      };

      try {
        const response = await axios.post('https://hrm-backend-square.onrender.com/event/create', Eventdata);
        
        setEvents([...events, Eventdata]);
        if (response.status === 200) {
          console.log('Event created successfully:', response.data);

          setVisible(false);
          setname('');
          setEventStartDate(null);
          setEventEndDate(null);
          setEndTime('');
          setStartTime('');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  const customTitle = (args) => {
    const { event } = args;
    return (
      <div>
        <h4>{event.title}</h4>
        <p> {event.start.toLocaleTimeString()}</p>
        <p> {event.end.toLocaleTimeString()}</p>
      </div>
    );
  };
  
  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek'
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        eventContent={customTitle}
        eventBackgroundColor="#6499E9"
        eventBorderColor='#6499E9'
      />
      <div className="card flex justify-content-center">
        <Dialog
          header="New Event"
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: '30vw' }}
          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
          <div style={flexStyle} className="flex flex-column gap-2">
            <InputText id="username" aria-describedby="username-help" value={name} onChange={(e) => setname(e.target.value)} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                    sx={{ width: '170px', marginRight: '26px',marginBottom:'40px'}}
                  />
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
                    sx={{ width: '170px'}}
                  />
                </div>
              </Grid>
            </Grid>

            <Button label="Submit" icon="pi pi-check" onClick={handleSubmitEvent} />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Newevent;
