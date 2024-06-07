import {
  attendantEndpoints,
  userEndpoints
} from '../components/data/apiEndpoins';
import { User } from '../components/user/user';
import { API } from './api';

export const getToken = () => localStorage.getItem('token');
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const displaySuccessMessage = (message) => {
  const successMessage = document.createElement('p');
  successMessage.classList.add('success-message');
  successMessage.textContent = message;
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
  main.append(successMessage);
};

export const displayErrorMessage = (message) => {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
  main.append(errorMessage);
};

export const attendanceBtn = async () => {
  const attendanceButton = document.querySelectorAll('.confirm-btn');

  attendanceButton.forEach((button) => {
    button.addEventListener('click', async () => {
      const eventId = button.getAttribute('data-event-id');
      const user = getUser();

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

          if (response.message === 'Assistance confirmed succesfully') {
            displaySuccessMessage('Asistencia confirmada con éxito');
          } else {
            displayErrorMessage(
              'Error confirmando asistencia: ',
              response.message
            );
          }
        } catch (error) {
          console.error('Error al confirmar asistencia al evento', error);
          displayErrorMessage('Error al confirmar asistencia al evento', error);
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

            if (response.message === 'Assistance confirmed succesfully') {
              displaySuccessMessage('Asistencia confirmada con éxito');
            } else {
              displayErrorMessage(
                'Error confirmando asistencia: ',
                response.message
              );
            }
          } catch (error) {
            console.error('Error al confirmar asistencia al evento', error);
            displayErrorMessage(
              'Error al confirmar asistencia al evento',
              error
            );
          }
        }
      }
    });
  });

  //cuando se haga click en botón Asistir, 2 situaciones:
  //1. si es usuario registrado, se deberá obtener el ID del evento para incluirlo en el perfil
  //2. si es usuario no registrado, se abrirá formulario con input email para enviarle correo de confirmación al evento
};
