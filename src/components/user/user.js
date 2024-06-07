import { API } from '../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage,
  getUser
} from '../../utils/functions';
import { eventEndpoints, userEndpoints } from '../data/apiEndpoins';
import './user.css';

const main = document.querySelector('#main');
export const User = async () => {
  main.innerHTML = '';

  const user = getUser();
  if (!user) {
    console.error('User not found in localStorage');
    return;
  }
  const userId = user._id;

  try {
    const res = await API({
      endpoint: userEndpoints.getUserByIdRoute(userId),
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Response:', res);

    printUser(res);

    const eventsCreatedId = res.eventsCreated.map((event) => event._id);
    const eventsToAttendId = res.eventsToAttend.map((event) => event._id);

    await loadEvents(eventsCreatedId, 'events-created');
    await loadEvents(eventsToAttendId, 'events-attending');
  } catch (error) {
    console.error('Error fetching user: ', error);
  }
};

const printUser = (user) => {
  const userDataSection = document.createElement('section');
  userDataSection.classList.add('user-data-section');

  userDataSection.innerHTML = `
        <img src="${user.imgProfile}" class="avatar"/>
        <button class="change-img-btn">Cambiar imagen</button>
        <input type="file" id="file-input" class="change-img-input" accept="image/*">
        <div class="principal-user-div">
          <section class="each-section-profile personal-data">
            <h3>Datos Personales</h3> 
            <div class="info-personal">
              <p>Name/Username: ${user.name}</p>
              <p>Email: ${user.email}</p>
              <button class="edit-data">Editar datos</button>
            </div>
            <form class="edit-form">
              <div class="each-input-div">
                <label class="label-edit-data" for="name">Name/Username</label>
                <input type="text" id="name" name="name" value="${user.name}">
              </div>
              <div class="each-input-div">
                <label class="label-edit-data" for="password">Nueva contraseña</label>
                <input type="password" id="password" name="password" placeholder="Nueva contraseña">
              </div>
              <div class="each-input-div">
                <label class="label-edit-data" for="confirm-password">Confirmar contraseña</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmar contraseña">
              </div>
              <button type="submit" class="submit-edit-btn">Guardar cambios</button>
            </form>
          </section>
          <section class="each-section-profile attending-events-section">
            <h3>Eventos a los que asisto</h3>
            <div class="events-attending"></div>
          </section>
          <section class="each-section-profile created-events-section">
            <h3>Eventos creados</h3>
            <div class="events-created"></div>
          </section>
        </div>
        `;

  main.append(userDataSection);
  setUpEventListeners();
};

const loadEvents = async (eventIds, sectionClass) => {
  const section = document.querySelector(`.${sectionClass}`);

  for (const eventId of eventIds)
    try {
      const event = await API({
        endpoint: eventEndpoints.getEventByIdRoute(eventId),
        method: 'GET'
      });

      const eventsDiv = document.createElement('div');
      eventsDiv.classList.add('events-div');

      eventsDiv.innerHTML = `
          <h4 class="event-title-profile">${event.title}</h4>
          <p class="event-date-profile">${event.date}</p>
        `;

      section.append(eventsDiv);
    } catch (error) {
      console.error(`Error fetching event ${eventId}`, error);
    }
};

const setUpEventListeners = () => {
  const user = getUser();
  const userId = user._id;

  document.querySelector('.change-img-btn').addEventListener('click', () => {
    document.querySelector('#file-input').click();
  });

  document
    .querySelector('#file-input')
    .addEventListener('change', async (e) => {
      const formData = new FormData();
      formData.append('imgProfile', e.target.files[0]);

      try {
        const res = await API({
          endpoint: userEndpoints.updateUserRoute(userId),
          method: 'PUT',
          body: formData
        });

        if (res) {
          displaySuccessMessage('Imagen de perfil actualizada');
          User();
        }
      } catch (error) {
        console.error('Error al actualizar la imagen de perfil', error);
        displayErrorMessage(
          'Hubo un problema al actualizar la imagen de perfil'
        );
      }
    });

  document.querySelector('.edit-data').addEventListener('click', () => {
    document.querySelector('.info-personal').style.display = 'none';
    document.querySelector('.edit-form').style.display = 'block';
  });

  document.querySelector('.edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
      name: document.querySelector('#name').value
    };

    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (password) {
      if (password !== confirmPassword) {
        displayErrorMessage('Las contraseñas no coinciden');
        return;
      }
      updatedData.password = password;
    }

    try {
      const res = await API({
        endpoint: userEndpoints.updateUserRoute(userId),
        method: 'PUT',
        body: updatedData
      });

      if (res) {
        displaySuccessMessage('Los datos han sido actualizados');
        localStorage.setItem('user', JSON.stringify(res));
        User();
      }
    } catch (error) {
      console.error('Error al actualizar los datos personales', error);
      displayErrorMessage(
        'Hubo un problema al actualizar los datos personales'
      );
    }
  });
};
