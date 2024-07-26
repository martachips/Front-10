import { generateInput } from '../../components/forms/forms';
import { hideLoader, loader } from '../../components/loader/loader';
import { eventEndpoints } from '../../data/apiEndpoins';
import { categories, generateCategoryOptions } from '../../data/categories';
import { API } from '../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage
} from '../../utils/functions';
import './createEvent.css';

const main = document.querySelector('#main');
export const createEvent = async () => {
  main.innerHTML = '';
  loader();
  try {
    createEventForm(categories);
  } catch (error) {
    displayErrorMessage('Error al cargar el formulario de creación de eventos');
    console.error(
      'Error al cargar el formulario de creación de eventos: ',
      error
    );
  } finally {
    hideLoader();
  }
};

const createEventForm = (categories) => {
  const createEventSection = document.createElement('section');
  createEventSection.classList.add('create-section');

  createEventSection.innerHTML = `
    <form class="create-form" enctype="multipart/form-data">
    ${generateInput({
      id: 'title',
      placeholder: "'F.e. Tomorrowland'",
      labelText: 'Título',
      labelInputClass: 'create'
    })}
    ${generateInput({
      id: 'link',
      placeholder: "'F.e. https://www.tomorrowland.com/home/'",
      labelText: 'Link a página oficial',
      labelInputClass: 'create'
    })}
    ${generateInput({
      id: 'date',
      placeholder: "'20/08/2024'",
      labelText: 'Fecha',
      labelInputClass: 'create'
    })}
    ${generateInput({
      id: 'location',
      placeholder: "'F.e. Bélgica'",
      labelText: 'Ubicación',
      labelInputClass: 'create'
    })}
    ${generateInput({
      id: 'description',
      placeholder: "'F.e. Festival de música electrónica'",
      labelText: 'Descripción',
      labelInputClass: 'create'
    })}
      <div class="each-input-div-reg">
        <label for="image" class="label-create">Imagen
          <div class="div-span"> 
            <span class="img-file-span span">Ningún archivo seleccionado</span>
            <span class="img-file-btn span"> Buscar archivo</span>
          </div>
        </label>
        <input type="file" accept="image/*" id="image" name="image" class="input-event-img input-create"></input>
      </div> 
      <div class="each-input-div-reg">
        <label for="category" class="label-create" required>Categoría</label>
        <select id="category" name="category" class="input-create" required>
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
  loader();
  const formData = new FormData(e.target);

  try {
    const res = await API({
      endpoint: eventEndpoints.createEventRoute,
      method: 'POST',
      body: formData
    });

    if (res) {
      displaySuccessMessage('Se ha creado el evento exitosamente');
      console.log('Evento creado: ', res);
    } else {
      displayErrorMessage('Error al crear el evento');
      console.error('Error al crear el evento', res.statusText);
    }
  } catch (error) {
    console.error('Error al enviar el formulario: ', error);
    displayErrorMessage('Error al enviar el formulario');
  } finally {
    console.log('ocultando loader');
    hideLoader();
  }
};
