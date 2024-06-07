const BASE_URL = 'http://localhost:3000/api/v1';

export const userEndpoints = {
  getUsersRoute: `${BASE_URL}/user`,
  getUserByIdRoute: (id) => `${BASE_URL}/user/${id}`,
  registerRoute: `${BASE_URL}/user/register`,
  loginRoute: `${BASE_URL}/user/login`,
  updateUserRoute: (id) => `${BASE_URL}/user/update/${id}`,
  confirmAssistanceUserRoute: (eventId) =>
    `${BASE_URL}/user/events/${eventId}/attendance/confirm`,
  deleteUserRoute: (id) => `${BASE_URL}/user/delete/${id}`
};

export const eventEndpoints = {
  getEventsRoute: `${BASE_URL}/event`,
  getEventByIdRoute: (id) => `${BASE_URL}/event/${id}`,
  getEventByCategoryRoute: (category) =>
    `${BASE_URL}/event/category/${category}`,
  createEventRoute: `${BASE_URL}/event/createEvent`,
  validateEventRoute: (eventId) => `${BASE_URL}/event/validate/${eventId}`,
  updateEventRoute: (eventId) => `${BASE_URL}/event/update/${eventId}`,
  deleteEventRoute: (eventId) => `${BASE_URL}/event/${eventId}/delete`
};

export const attendantEndpoints = {
  getAttendantsRoute: `${BASE_URL}/attendants`,
  getAttendantById: (id) => `${BASE_URL}/attendants/${id}`,
  confirmAssistanceAttendantRoute: (eventId) =>
    `${BASE_URL}/attendants/events/${eventId}/attendance/confirm`
};
