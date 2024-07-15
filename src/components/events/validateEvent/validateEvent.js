import { eventEndpoints } from '../../../data/apiEndpoins';
import { API } from '../../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage
} from '../../../utils/functions';

export const createValidateBtn = (event) => {
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

export const validateEvent = async (eventId) => {
  await API({
    endpoint: eventEndpoints.validateEventRoute(eventId),
    method: 'PUT'
  });
};
