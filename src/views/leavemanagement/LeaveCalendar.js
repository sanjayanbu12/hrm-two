import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
  const LeaveCalendar = () => {
    const [events, setEvents] = useState([]);
    const handleSelect = (info) => {
      const { start, end } = info;
      const 
      if (eventNamePrompt) {
        setEvents([
          ...events,
          {
            start,
            end,
            title: eventNamePrompt,
          },
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
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay"
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </div>
    );
      }

  export default LeaveCalendar