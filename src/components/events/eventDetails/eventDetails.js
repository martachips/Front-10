import { eventEndpoints } from '../../../data/apiEndpoins';
import { eventPage } from '../../../pages/events/events';
import { API } from '../../../utils/api';
import { attendanceBtn } from '../../../utils/functions';

export const showEventDetails = async (eventId) => {
  const event = await API({
    endpoint: eventEndpoints.getEventByIdRoute(eventId),
    method: 'GET'
  });
  displayEventDetails(event);
};

export const displayEventDetails = (event) => {
  main.innerHTML = '';
  const eventDetails = document.createElement('article');
  eventDetails.classList.add('event-details');

  eventDetails.innerHTML = `
    <div class="date-and-img">
      <p class="date-paragraph">${event.date}</p>
      <img src="${event.img}" class="event-img"/>
    </div>
    <div class="details">
      <p class="event-title info">${event.title}</p>
      <a href="${event.link}" class="event-link info">${event.link}</a>
      <p class="event-location info">${event.location}</p>
      <p class="event-descript info">${event.description}</p>
      <p class="event-category info">${event.category}</p>
      <button class="confirm-btn" data-event-id="${event._id}">Asistir</button>
    </div>
    <button class="back-btn">Volver</button>
  `;

  eventDetails.querySelector('.back-btn').addEventListener('click', () => {
    eventPage();
  });

  main.append(eventDetails);
  attendanceBtn();
};
