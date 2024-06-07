import { eventEndpoints } from '../../components/data/apiEndpoins';
import { API } from '../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage
} from '../../utils/functions';
import './createEvent.css';

const main = document.querySelector('#main');
export const createEvent = async () => {
  main.innerHTML = '';

  const events = await API({
    endpoint: eventEndpoints.getEventsRoute,
    method: 'GET'
  });

  const categories = await getCategories(events);
  createEventForm(categories);
};

const createEventForm = (categories) => {
  const createEventSection = document.createElement('section');
  createEventSection.classList.add('create-section');

  createEventSection.innerHTML = `
    <form class="create-form" enctype="multipart/form-data">
      <div class="each-input-div">
        <label for="title" class="label-create label-event-title">Título</label>
        <input type="text" id="title" name="title" class="input-event-title input-create" placeholder="'F.e. Tomorrowland'" required></input>
      </div>
      <div class="each-input-div">
        <label for="link" class="label-create label-link" >Link a página oficial</label>
        <input type="text" id="link" name="link" class="input-event-link input-create" required placeholder="'F.e. https://www.tomorrowland.com/home/'"></input>
      </div> 
      <div class="each-input-div">
        <label for="date" class="label-create label-date">Fecha</label>
        <input type="date" id="date" name="date" class="input-event-date input-create" placeholder="'20/08/2024'"></input>
      </div> 
      <div class="each-input-div">
        <label for="location" class="label-create label-loc" >Ubicación</label>
        <input type="text" id="location" name="location" class="input-event-loc input-create" placeholder="'F.e. Bélgica'"></input>
      </div> 
      <div class="each-input-div">
        <label for="description" class="label-create label-descript" >Descripción</label>
        <input type="text" id="description" name="description" class="input-event-descript input-create" placeholder="'F.e. Festival de música electrónica'" maxlength="300"></input>
      </div> 
      <div class="each-input-div">
        <label for="image" class="label-create label-img">Imagen
          <div class="div-span"> 
          <span class="img-file-span span">Ningún archivo seleccionado</span>
          <span class="img-file-btn span"> Buscar archivo</span>
        </div>
        </label>
        <input type="file" accept="image/*" id="image" name="image" class="input-event-img input-create"></input>
      </div> 
      <div class="each-input-div">
        <label for="category" class="label-create label-categ" required>Categoría</label>
        <select id="category" name="category" class="input-event-category input-create" required>
          ${generateCategoryOptions(categories)}
        </select>
      </div> 
      <button class="create-btn">Crear</button>
    </form>
  
  `;

  main.append(createEventSection);
  imgSelected();
  const form = document.querySelector('.create-form');
  form.addEventListener('submit', submitFormEvent);
};

const imgSelected = () => {
  const imgInput = document.querySelector('#image');
  const imgFileSpan = document.querySelector('.img-file-span');
  const imgFileBtn = document.querySelector('.img-file-btn');

  imgFileBtn.addEventListener('click', () => {
    imgInput.click();
  });

  imgInput.addEventListener('change', (e) => {
    const fileName =
      imgInput.files.length > 0
        ? imgInput.files[0].name
        : 'Ningún archivo seleccionado';
    imgFileSpan.innerHTML = fileName;
  });
};

const submitFormEvent = async (e) => {
  e.preventDefault();
  console.log('enviando formulario');

  const formData = new FormData(e.target);

  try {
    const res = await API({
      endpoint: eventEndpoints.createEventRoute,
      method: 'POST',
      body: formData
    });

    if (res) {
      // const result = await res.json();
      displaySuccessMessage('Se ha creado el evento exitosamente');
      console.log('Evento creado: ', res);
    } else {
      displayErrorMessage('Error al crear el evento');
      console.error('Error al crear el evento', res.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario: ', error);
    displayErrorMessage('Error al enviar el formulario');
  }
};

const getCategories = async (events) => {
  const categories = new Set();
  categories.add('Selecciona una categoría');

  for (const event of events) {
    categories.add(event.category);
  }
  return Array.from(categories);
};

const generateCategoryOptions = (categories) => {
  if (!Array.isArray(categories)) {
    return '<option value="">No categories available</option>';
  }

  return categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join('');
};
