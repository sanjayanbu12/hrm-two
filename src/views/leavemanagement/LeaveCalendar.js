import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name,setname]=useState('')
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const flexStyle={
    display: 'flex', flexDirection: 'column', gap: '15px'
  }
  const handleSelect = (info) => {
    const { start, end } = info;
    setEventStartDate(start); // Format as ISO string
    setEventEndDate(end);
    setVisible(true);
  };
  useEffect(()=>{
    console.log(events)
  },[events])
  const handleSubmitEvent = () => {
    if (name && eventStartDate && eventEndDate) {
      setEvents([
        ...events,
        {
          start: eventStartDate,
          end: eventEndDate,
          title: name,
        },
      ]);
      
      setVisible(false)
      setname("");
      setEventStartDate(null);
      setEventEndDate(null);
    }
  };

  const customTitle =(args)=>{
    const {event}=args
    return(
      <h3>{event.title}</h3>
    )
  }
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
          // end: 'dayGridMonth,dayGridWeek,dayGridDay'
          end:''
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        
        eventContent={customTitle}
        eventBackgroundColor='green'
      />
      <div className="card flex justify-content-center">
        <Dialog
          header="Add Holiday"
          visible={visible}
          onHide={() => setVisible(false)}
          style={{ width: '30vw' }}
          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
          <div style= {flexStyle} className="flex flex-column gap-2">
            <InputText id="username" aria-describedby="username-help" onChange={(e)=>setname(e.target.value)}/>
            <Button label="Submit" icon="pi pi-check" onClick={handleSubmitEvent} />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LeaveCalendar;
