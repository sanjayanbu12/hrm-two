import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useContext } from 'react';
import ApiContext from 'context/api/ApiContext';
import FormSubmittedContext from 'context/isformsubmited/FormSubmittedContext';

const Newevent = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [fetcheddata, setFetcheddata] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { eventContextData } = useContext(ApiContext);
  const { eventStatus, seteventStatus } = useContext(FormSubmittedContext);

  const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const eventStyle = {
    width: '80px',
    height: '40px',
    color: 'white',
    borderRadius: '5px',
    textAlign: 'center',
    margin: '0',
    padding: '0'
  };

  const handleSelect = (info) => {
    const { start, end } = info;
    setEventStartDate(start.toISOString());
    setEventEndDate(end.toISOString());
    setVisible(true);
  };

  const handleSubmitEvent = async () => {
    if (name && eventStartDate && eventEndDate) {
      const event = {
        title: name,
        startDate: eventStartDate,
        endDate: eventEndDate
      };

      try {
        const response = await axios.post('https://hrm-backend-square.onrender.com/event/create', event);
        seteventStatus(!eventStatus);
        if (response.status === 200) {
          console.log('Event created successfully:', response.data);
          setEvents([...events, event]);
          setVisible(false);
          setName('');
          setEventStartDate(null);
          setEventEndDate(null);
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [eventContextData]);

  const fetchdata = async () => {
    try {
      const response = await eventContextData;
      const alldata = response.data.data.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate
      }));
      console.log(alldata);
      setFetcheddata(alldata);
    } catch (error) {
      console.error('Error in fetching calendar:', error);
    }
  };

  const customTitle = (args) => {
    const { event } = args;

    const handleClick = () => {
      handleEventClick(event);
    };

    return (
      <div style={eventStyle}>
        <button
          onClick={handleClick}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0',
            font: 'inherit',
            cursor: 'pointer'
          }}
        >
          <h3 style={{ color: 'white' }}>{event.title}</h3>
        </button>
      </div>
    );
  };

  const handleEventDrop = (info) => {
    const { event } = info;

    const updatedEvent = {
      id: event.id,
      title: event.title,
      startDate: event.start,
      endDate: event.end
    };

    axios
      .put(`https://hrm-backend-square.onrender.com/event/update/${updatedEvent.id}`, updatedEvent)
      .then((response) => {
        if (response.status === 200) {
          seteventStatus(!eventStatus);
          console.log('Event updated successfully:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };

  const handleUpdate = () => {
    if (selectedEvent) {
      const updatedEvent = {
        id: selectedEvent.id,
        startDate: selectedEvent.start.toISOString(),
        endDate: selectedEvent.end.toISOString(),
        title: name
      };

      axios
        .put(`https://hrm-backend-square.onrender.com/event/update/${updatedEvent.id}`, updatedEvent)
        .then((response) => {
          if (response.status === 200) {
            seteventStatus(!eventStatus);
            console.log('Event updated successfully:', response.data);
            setEvents((prevEvents) => prevEvents.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
          }
        })
        .catch((error) => {
          console.error('Error updating event:', error);
        });

      setVisible(false);
      setSelectedEvent(null);
      setName('');
    }
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setVisible(true);
    setName(event.title);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      axios
        .delete(`https://hrm-backend-square.onrender.com/event/delete/${selectedEvent.id}`)
        .then((response) => {
          if (response.status === 200) {
            seteventStatus(!eventStatus);
            console.log('Event deleted successfully:', response.data);
            setEvents(events.filter((e) => e.id !== selectedEvent.id));
            fetchdata();
          }
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
      setVisible(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events.concat(fetcheddata)}
        select={handleSelect}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek'
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        eventContent={customTitle}
        eventBackgroundColor="red"
        eventBorderColor="red"
        eventDrop={handleEventDrop}
      />
      <div className="card flex justify-content-center">
        <Dialog
          header={selectedEvent ? 'Update Event' : 'Add Event'}
          visible={visible}
          onHide={() => {
            setVisible(false);
            setSelectedEvent(null);
          }}
          style={{ width: '30vw' }}
          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
          <div style={flexStyle} className="flex flex-column gap-2">
            <InputText id="username" aria-describedby="username-help" value={name} onChange={(e) => setName(e.target.value)} />
            {selectedEvent ? (
              <Button label="Update" icon="pi pi-check" onClick={() => handleUpdate()} />
            ) : (
              <Button label="Submit" icon="pi pi-check" onClick={handleSubmitEvent} />
            )}
            {selectedEvent ? <Button label="Delete" onClick={handleDeleteEvent} /> : ''}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Newevent;
