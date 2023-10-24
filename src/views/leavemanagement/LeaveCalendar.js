import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const Container = styled.div`
  justify-content: center;
  padding: 20px;
  align-items: center;
  border-radius: 5px;
  font-size: 20px;
  font-family: sans-serif;
  font-weight: bold;
`;

const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setname] = useState('');
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [fetcheddata, setFetcheddata] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log(selectedEvent);
  console.log(fetcheddata);
  console.log(events);
  const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };
  const handleSelect = (info) => {
    const { start, end } = info;
    setEventStartDate(start);
    setEventEndDate(end);
    setVisible(true);
    setname('');
  };

  const handleSubmitEvent = async () => {
    if (name && eventStartDate && eventEndDate) {
      const Eventdata = {
        start: eventStartDate,
        end: eventEndDate,
        title: name
      };

      try {
        const response = await axios.post('https://pulsehr-express-server.onrender.com/cal/createCal', Eventdata);

        if (response.status === 200) {
          console.log('Event created successfully:', response.data);
          // setEvents([...events, Eventdata]);
          fetData();
          setVisible(false);
          setname('');
          setEventStartDate(null);
          setEventEndDate(null);
        }
        console.log(events);
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  const fetData = () => {
    const apiurl = `https://pulsehr-express-server.onrender.com/cal/getCal`;

    axios
      .get(apiurl)
      .then((response) => {
        const alldata = response.data.getData.map((event) => ({
          id: event._id,
          title: event.title,
          start: event.start,
          end: event.end
        }));
        console.log(alldata);
        setFetcheddata(alldata);
      })
      .catch((error) => {
        console.error('Error in fetching calendar:', error);
      });
  };

  useEffect(() => {
    fetData();
  }, []);

  const customTitle = (args) => {
    const { event } = args;
    console.log(event);

    return <Container onClick={() => handleEventClick(event)}>{event.title}</Container>;
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    console.log(event);
    const updatedEvent = {
      id: event.id,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      title: event.title
    };

    console.log(updatedEvent);

    axios
      .put(`https://pulsehr-express-server.onrender.com/cal/updateCal/${updatedEvent.id}`, updatedEvent)
      .then((response) => {
        if (response.status === 200) {
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
        start: selectedEvent.start.toISOString(),
        end: selectedEvent.end.toISOString(),
        title: name
      };

      axios
        .put(`https://pulsehr-express-server.onrender.com/cal/updateCal/${updatedEvent.id}`, updatedEvent)
        .then((response) => {
          if (response.status === 200) {
            console.log('Event updated successfully:', response.data);
            // Update the event in the events state
            setEvents((prevEvents) => prevEvents.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
            fetData();
          }
        })
        .catch((error) => {
          console.error('Error updating event:', error);
        });

      setVisible(false);
      setSelectedEvent(null);
      setname('');
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setVisible(true);
    setname(event.title);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      axios
        .delete(`https://pulsehr-express-server.onrender.com/cal/removeCal/${selectedEvent.id}`)

        .then((response) => {
          if (response.status === 200) {
            console.log('Event deleted successfully:', response.data);
            setEvents(events.filter((e) => e.id !== selectedEvent.id));
          }
          fetData();
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
          end: ''
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        eventContent={customTitle}
        eventDrop={handleEventDrop}
      />
      <div className="card flex justify-content-center">
        <Dialog
          header={selectedEvent ? 'Update Holiday' : 'Add Holiday'}
          visible={visible}
          onHide={() => {
            setVisible(false);
            setSelectedEvent(null);
          }}
          style={{ width: '30vw' }}
          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
          <div style={flexStyle} className="flex flex-column gap-2">
            <InputText id="username" aria-describedby="username-help" value={name} onChange={(e) => setname(e.target.value)} />
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

export default LeaveCalendar;
