import { attendantEndpoints, userEndpoints } from '../../data/apiEndpoins';
import { API } from '../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage,
  getUser,
  updateUser
} from '../../utils/functions';

export const attendanceBtn = async () => {
  const attendanceButton = document.querySelectorAll('.confirm-btn');

  attendanceButton.forEach((button) => {
    button.addEventListener('click', async () => {
      const eventId = button.getAttribute('data-event-id');
      const user = getUser();

      const handleResponse = (response) => {
        if (response.message === 'Assistance confirmed successfully') {
          displaySuccessMessage('Asistencia confirmada con éxito');

          user.eventsToAttend.push(eventId);
          updateUser(user);

          const confirmMessage = document.createElement('p');
          confirmMessage.textContent = 'Ya ha sido confirmada tu asistencia';
          confirmMessage.classList.add('attendance-confirmed');
          button.replaceWith(confirmMessage);
        } else {
          displayErrorMessage(response.message);
        }
      };

      const handleError = (error) => {
        console.error('Error al confirmar asistencia al evento', error);
        displayErrorMessage(
          error.message || 'Error al confirmar asistencia al evento'
        );
      };

      if (user) {
        try {
          const response = await API({
            endpoint: userEndpoints.confirmAssistanceUserRoute(eventId),
            method: 'POST',
            body: {
              name: user.name,
              email: user.email
            }
          });

          handleResponse(response);
        } catch (error) {
          handleError(error);
        }
      } else {
        const email = prompt(
          'Por favor, ingresa tu email para confirmar asistencia:'
        );
        if (email) {
          try {
            const response = await API({
              endpoint:
                attendantEndpoints.confirmAssistanceAttendantRoute(eventId),
              method: 'POST',
              body: {
                name: 'Invitado',
                email: email
              }
            });

            handleResponse(response);
          } catch (error) {
            handleError(error);
          }
        }
      }
    });
  });
};
