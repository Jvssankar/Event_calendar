import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { getStoredEvents, storeEvents } from './utils/storage';

function App() {
  const [events, setEvents] = useState(getStoredEvents());

  useEffect(() => {
    storeEvents(events);
  }, [events]);

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <Calendar events={events} setEvents={setEvents} />
    </div>
  );
}

export default App;