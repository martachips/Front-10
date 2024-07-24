import { eventEndpoints } from '../../../data/apiEndpoins';
import { eventPage } from '../../../pages/events/events';
import { API } from '../../../utils/api';
import { getUser } from '../../../utils/functions';
import { attendanceBtn } from '../attendance';

export const showEventDetails = async (eventId) => {
  const event = await API({
    endpoint: eventEndpoints.getEventByIdRoute(eventId),
    method: 'GET'
  });
  const user = getUser();
  displayEventDetails(event, user);
};

export const displayEventDetails = (event, user) => {
  main.innerHTML = '';
  const eventDetails = document.createElement('article');
  eventDetails.classList.add('event-details');

  let attendanceButton = `<button class="confirm-btn" data-event-id="${event._id}">Asistir</button>`;
  if (user && user.eventsToAttend.includes(event._id)) {
    attendanceButton = `<p class="attendance-confirmed">Ya ha sido confirmada tu asistencia</p>`;
  }
  eventDetails.innerHTML = `
    <div class="date-and-img">
      <p class="date-paragraph">${event.date}</p>
      <img src="${event.img}" class="event-img"/>
    </div>
    <div class="details">
      <p class="event-title info">${event.title}</p>
      <a href="${event.link}" class="event-link info">Página Oficial</a>
      <p class="event-location info">${event.location}</p>
      <p class="event-descript info">${event.description}</p>
      <p class="event-category info">${event.category}</p>
      ${attendanceButton}
    </div>
    <button class="back-btn">Volver</button>
  `;

  eventDetails.querySelector('.back-btn').addEventListener('click', () => {
    eventPage();
  });

  main.append(eventDetails);
  attendanceBtn();
};
