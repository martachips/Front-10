import { saveEventDetails } from './saveChangesEvent';

export const createEditForm = (event) => {
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

export const createEditEventBtn = (event, eventInfoDiv, editForm) => {
  const editEventBtn = document.createElement('button');
  editEventBtn.classList.add('edit-event-btn');
  editEventBtn.dataset.eventId = event._id;
  editEventBtn.textContent = 'Modificar';
  editEventBtn.addEventListener('click', () => {
    toggleEditForm(eventInfoDiv, editForm, editEventBtn);
  });
  return editEventBtn;
};

export const toggleEditForm = (eventInfoDiv, editForm, editEventBtn) => {
  const isEditing = editForm.style.display === 'flex';
  editForm.style.display = isEditing ? 'none' : 'flex';
  eventInfoDiv.style.display = isEditing ? 'flex' : 'none';
  editEventBtn.innerText = isEditing ? 'Modificar' : 'Volver';
};
