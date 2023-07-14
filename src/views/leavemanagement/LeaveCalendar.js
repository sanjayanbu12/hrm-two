
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function LeaveCalendar() {
  const holidays = [
    {
      title: "New Year's Day",
      date: "2023-01-01",
      color: "#FF0000", // Red color
    },
    {
      title: "Diwali",
      date: "2023-11-04",
      color: "#FF6347", // Tomato color
    },
    {
      title: "Pongal",
      date: "2024-01-14",
      color: "#4B0082", // Indigo color
    },
  ];

  const eventRender = (info) => {
    if (info.el) {
      const eventColor = info.event.extendedProps.color;
      info.el.style.backgroundColor = eventColor;
      info.el.style.color = "#FFFFFF"; // White text color
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#F5F5F5" }}>
      <div style={{ width: "600px", backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={holidays}
          eventContent={eventRender}
        />
      </div>
    </div>
  );
}

export default LeaveCalendar;
