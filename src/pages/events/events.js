import { eventEndpoints } from '../../components/data/apiEndpoins';
import { API } from '../../utils/api';
import {
  attendanceBtn,
  displayErrorMessage,
  displaySuccessMessage,
  getUser
} from '../../utils/functions';
import './events.css';

const main = document.querySelector('#main');

export const eventPage = async () => {
  main.innerHTML = '';

  const events = await API({
    endpoint: eventEndpoints.getEventsRoute,
    method: 'GET'
  });

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

const createEditForm = (event) => {
  const editForm = document.createElement('div');
  editForm.classList.add('edit-event-form');
  editForm.innerHTML = `
    <input type="text" name="title" value="${event.title}" placeholder="Título del evento"/> 
    <input type="text" name="link" value="${event.link}" placeholder="Enlace del evento"/>
    <input type="text" name="location" value="${event.location}" placeholder="Ubicación"/>
    <textarea name="description" placeholder="Descripción del evento">${event.description}</textarea>
    <input type="text" name="category" value="${event.category}" placeholder="Categoría del evento"/>
    <button class="save-event-btn" data-event-id="${event._id}">Guardar</button>
  `;

  editForm
    .querySelector('.save-event-btn')
    .addEventListener('click', async (e) => {
      await saveEventDetails(e);
    });
  return editForm;
};

const createEditEventBtn = (event, eventInfoDiv, editForm) => {
  const editEventBtn = document.createElement('button');
  editEventBtn.classList.add('edit-event-btn');
  editEventBtn.dataset.eventId = event._id;
  editEventBtn.textContent = 'Modificar';
  editEventBtn.addEventListener('click', () => {
    toggleEditForm(eventInfoDiv, editForm, editEventBtn);
  });
  return editEventBtn;
};

const saveEventDetails = async (e) => {
  const eventId = e.target.dataset.eventId;
  const eventCard = e.target.closest('.event-card');
  const editForm = eventCard.querySelector('.edit-event-form');
  const updatedEvent = {
    title: editForm.querySelector("input[name='title']").value,
    link: editForm.querySelector("input[name='link']").value,
    location: editForm.querySelector("input[name='location']").value,
    description: editForm.querySelector("textarea[name='description']").value,
    category: editForm.querySelector("input[name='category']").value
  };
  try {
    await API({
      endpoint: eventEndpoints.updateEventRoute(eventId),
      method: 'PUT',
      body: updatedEvent
    });
    displaySuccessMessage('Evento actualizado con éxito');
    eventPage();
  } catch (error) {
    console.error('Error al actualizar el evento', error);
    displayErrorMessage('Error al actualizar el evento');
  }
};

const createValidateBtn = (event) => {
  const validateBtn = document.createElement('button');
  validateBtn.classList.add('validate-btn');
  validateBtn.dataset.eventId = event._id;
  validateBtn.innerText = 'Validar';
  validateBtn.addEventListener('click', async () => {
    try {
      await validateEvent(event._id);
      displaySuccessMessage('Evento validado con éxito');
    } catch (error) {
      console.error('Error al validar al evento', error);
      displayErrorMessage('Error al validar el evento');
    }
  });
  return validateBtn;
};

const validateEvent = async (eventId) => {
  await API({
    endpoint: eventEndpoints.validateEventRoute(eventId),
    method: 'PUT'
  });
};

const toggleEditForm = (eventInfoDiv, editForm, editEventBtn) => {
  const isEditing = editForm.style.display === 'flex';
  editForm.style.display = isEditing ? 'none' : 'flex';
  eventInfoDiv.style.display = isEditing ? 'flex' : 'none';
  editEventBtn.innerText = isEditing ? 'Modificar' : 'Volver';
};

const showEventDetails = async (eventId) => {
  const event = await API({
    endpoint: eventEndpoints.getEventByIdRoute(eventId),
    method: 'GET'
  });
  displayEventDetails(event);
};

const displayEventDetails = (event) => {
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

const categories = (events, fatherElement) => {
  const divCategories = document.createElement('div');
  divCategories.classList.add('div-categories');

  const categories = new Set();
  categories.add('All');

  for (const event of events) {
    categories.add(event.category);
  }

  for (const category of categories) {
    const categ = document.createElement('p');
    categ.textContent = category;
    categ.classList.add('category');

    categ.addEventListener('click', () => {
      let filteredEvents = events;
      if (category !== 'All') {
        filteredEvents = events.filter((event) => event.category === category);
      }

      fatherElement.querySelector('.events-section').remove();
      printEvents(filteredEvents, fatherElement);
    });

    divCategories.append(categ);
  }
  fatherElement.append(divCategories);
};
