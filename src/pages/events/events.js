import { attendanceBtn } from '../../components/events/attendance';
import {
  createEditEventBtn,
  createEditForm
} from '../../components/events/editAndSaveChanges/editEvent';
import { showEventDetails } from '../../components/events/eventDetails/eventDetails';
import { createValidateBtn } from '../../components/events/validateEvent/validateEvent';
import { hideLoader, loader } from '../../components/loader/loader';
import { eventEndpoints } from '../../data/apiEndpoins';
import { API } from '../../utils/api';
import { getUser } from '../../utils/functions';
import './events.css';

const main = document.querySelector('#main');

export const eventPage = async () => {
  main.innerHTML = '';
  loader();

  const events = await API({
    endpoint: eventEndpoints.getEventsRoute,
    method: 'GET'
  });

  hideLoader();
  categories(events, main);
  printEvents(events, main);
  attendanceBtn();
};

export const printEvents = (events, fatherElement) => {
  const user = getUser();
  const isAdmin = user && user.role === 'admin';

  const eventsSection = document.createElement('section');
  eventsSection.classList.add('events-section');

  for (const event of events) {
    if (!isAdmin && !event.validated) continue;

    const eventCard = createEventCard(event, isAdmin);
    eventsSection.append(eventCard);
  }
  fatherElement.append(eventsSection);
};

const createEventCard = (event, isAdmin) => {
  const eventCard = document.createElement('article');
  eventCard.classList.add('event-card');

  const eventInfoDiv = document.createElement('div');
  eventInfoDiv.classList.add('event-info-div');

  const dateAndImgDiv = document.createElement('div');
  dateAndImgDiv.classList.add('date-and-img');
  dateAndImgDiv.innerHTML = `
    <p class="date-paragraph">${event.date}</p>
    <img src="${event.img}" class="event-img"/>
  `;

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('details');
  detailsDiv.innerHTML = `
    <p class="event-title info">${event.title}</p>
    <p class="event-location info">${event.location}</p>
    <p class="event-category info">Estilo: ${event.category}</p>
  `;

  const showMoreBtn = document.createElement('button');
  showMoreBtn.classList.add('show-more-btn');
  showMoreBtn.dataset.eventId = event._id;
  showMoreBtn.textContent = 'Mostrar más';
  showMoreBtn.addEventListener('click', () => showEventDetails(event._id));

  eventInfoDiv.append(dateAndImgDiv, detailsDiv);
  detailsDiv.append(showMoreBtn);
  eventCard.append(eventInfoDiv);

  if (isAdmin) {
    const editForm = createEditForm(event);
    eventCard.append(editForm);

    const editEventBtn = createEditEventBtn(event, eventInfoDiv, editForm);
    eventCard.append(editEventBtn);

    const validateBtn = createValidateBtn(event);
    eventCard.append(validateBtn);

    const validationText = document.createElement('p');
    validationText.classList.add('validation', 'info');
    validationText.textContent = event.validated ? 'Validado' : 'No validado';
    if (validationText.textContent === 'Validado') {
      validationText.style.display = 'none';
      validateBtn.style.display = 'none';
    }
    eventCard.append(validationText);
  }

  return eventCard;
};

const categories = (events, fatherElement) => {
  const user = getUser();
  const isAdmin = user && user.role === 'admin';

  const divCategories = document.createElement('div');
  divCategories.classList.add('div-categories');

  const categories = new Set();
  categories.add('All');

  for (const event of events) {
    categories.add(event.category);
  }
  if (isAdmin) {
    categories.add('Validados');
    categories.add('No validados');
  }

  for (const category of categories) {
    const categ = document.createElement('p');
    categ.textContent = category;
    categ.classList.add('category');

    categ.addEventListener('click', () => {
      let filteredEvents = events;
      if (category === 'Validados') {
        filteredEvents = events.filter((event) => event.validated);
      } else if (category === 'No validados') {
        filteredEvents = events.filter((event) => !event.validated);
      } else if (category !== 'All') {
        filteredEvents = events.filter((event) => event.category === category);
      }

      fatherElement.querySelector('.events-section').remove();
      printEvents(filteredEvents, fatherElement);
    });

    divCategories.append(categ);
  }
  fatherElement.append(divCategories);
};
