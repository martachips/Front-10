import { userEndpoints } from '../../components/data/apiEndpoins';
import { routes } from '../../components/data/links';
import { API } from '../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage
} from '../../utils/functions';
import './register.css';

const main = document.querySelector('#main');

export const register = () => {
  main.innerHTML = '';

  createFormRegister();
};

const createFormRegister = () => {
  const registerSection = document.createElement('section');
  registerSection.classList.add('register-section');
  registerSection.innerHTML = `
  
    <form class="register-form" >   
    <h3 class="register-title">REGISTRO</h3>
      <div class="each-input-div">
        <label class="label-name label-reg" for="name">Name or Username</label>
        <input class="input-name input-reg" type="text" id="name" name="name" required placeholder="F.e: Durin"></input>
      </div>
      <div class="each-input-div">
        <label class="label-email label-reg" for="email">Email</label>
        <input class="input-name input-reg" type="email" id="email" name="email" required placeholder="F.e: durin123@gmail.com"></input>
      </div>
      <div class="each-input-div">
        <label class="label-password label-reg" for="password">Password</label>
        <input class="input-password input-reg" type="password" id="password" name="password" required placeholder="******"></input>  
        <p class="pass-control">La contraseña debe tener al menos 6 caracteres</p>
      </div>
        <button class="submit-btn">Registro</button>
    </form>
    <div class="already-registered">  
      <p>Ya estoy registrado</p>
      <button class="login-btn">Log In</button>
    </div>
  `;

  main.append(registerSection);

  const form = document.querySelector('.register-form');
  form.addEventListener('submit', submitForm);

  const loginBtn = document.querySelector('.login-btn');
  loginBtn.addEventListener('click', routes[5].page);
};

const submitForm = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const userData = {};
  formData.forEach((value, key) => {
    userData[key] = value;
  });

  try {
    const response = await API({
      endpoint: userEndpoints.registerRoute,
      method: 'POST',
      body: userData
    });

    if (response) {
      console.log('Registro realizado con éxito ', response);
      displaySuccessMessage('Registro realizado con éxito');
      form.reset();
    } else {
      const errorMessage = await response.text();
      console.error('Error en la solicitud de registro ', errorMessage);
      displayErrorMessage('Error en la solicitud de registro');
    }
  } catch (error) {
    console.error('Error en la solicitud: ', error);
    displayErrorMessage(error.message);
  }
};
