import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import EventForm from "./EventForm";
import CustomToolbar from "./CustomToolbar";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

function Calendar({ events, setEvents }) {
  const [openForms, setOpenForms] = useState([]); // support multiple open forms

  // Handle event dragging
  const moveEvent = ({ event, start, end }) => {
    const updated = events.map((evt) =>
      evt.id === event.id ? { ...evt, start, end } : evt
    );
    setEvents(updated);
  };

  // Handle empty slot click (to add new event)
  const handleSelectSlot = ({ start }) => {
    const newForm = {
      id: Date.now(),
      title: "",
      start: new Date(start),
      end: new Date(start),
    };
    setOpenForms((prev) => [...prev, newForm]);
  };

  // Handle existing event click (edit it)
  const handleSelectEvent = (event) => {
    const editForm = { ...event, id: Date.now() }; // give unique form ID
    setOpenForms((prev) => [...prev, editForm]);
  };

  // Close form handler
  const closeForm = (formId) => {
    setOpenForms((prev) => prev.filter((form) => form.id !== formId));
  };

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onEventDrop={moveEvent}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{
          toolbar: CustomToolbar,
        }}
      />

      {/* Render multiple event forms */}
      {openForms.map((form) => (
        <EventForm
          key={form.id}
          event={form}
          setEvents={setEvents}
          events={events}
          closeForm={() => closeForm(form.id)}
        />
      ))}
    </div>
  );
}

export default Calendar;
