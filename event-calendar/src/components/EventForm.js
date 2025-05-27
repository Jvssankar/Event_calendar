import React, { useState } from "react";
import moment from "moment";

const EventForm = ({ event, setEvents, events, closeForm }) => {
  const [title, setTitle] = useState(event.title || "");
  const [start, setStart] = useState(
    moment(event.start).format("YYYY-MM-DDTHH:mm")
  );
  const [end, setEnd] = useState(moment(event.end).format("YYYY-MM-DDTHH:mm"));

  const handleSave = () => {
    const newEvent = {
      id: event.id || new Date().getTime(),
      title,
      start: new Date(start),
      end: new Date(end),
    };

    const updatedEvents = event.id
      ? events.map((e) => (e.id === event.id ? newEvent : e))
      : [...events, newEvent];

    setEvents(updatedEvents);
    closeForm();
  };

  const handleDelete = () => {
    if (event.id) {
      const updatedEvents = events.filter((e) => e.id !== event.id);
      setEvents(updatedEvents);
    }
    closeForm();
  };

  return (
    <div className="event-form">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleSave}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Save
        </button>
        <button onClick={closeForm} style={{ backgroundColor: "#ccc" }}>
          Cancel
        </button>
        {event.id && (
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
