import { eventEndpoints } from '../../../data/apiEndpoins';
import { eventPage } from '../../../pages/events/events';
import { API } from '../../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage
} from '../../../utils/functions';

export const saveEventDetails = async (e) => {
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
