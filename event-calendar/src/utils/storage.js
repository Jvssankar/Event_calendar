export const getStoredEvents = () => {
  const data = localStorage.getItem('events');
  return data ? JSON.parse(data) : [];
};

export const storeEvents = (events) => {
  localStorage.setItem('events', JSON.stringify(events));
};