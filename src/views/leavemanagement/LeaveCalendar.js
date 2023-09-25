import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
const LeaveCalendar = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  
  const flexStyle={
    display: 'flex', flexDirection: 'column', gap: '15px'
  }
  const handleSelect = (info) => {
    setVisible(true);

    const { start, end } = info;
    if (visible === true) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt
        }
      ]);
    }
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
          end: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
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
            <InputText id="username" aria-describedby="username-help" />
            <Button label="Submit" icon="pi pi-check" />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LeaveCalendar;
