import { generateInput } from '../../components/forms/forms';
import { userEndpoints } from '../../data/apiEndpoins';
import { routes } from '../../data/links';
import { API } from '../../utils/api';
import {
  displayErrorMessage,
  displaySuccessMessage
} from '../../utils/functions';
import { submitLogin } from '../logIn/login';
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
    ${generateInput({
      id: 'name',
      placeholder: 'F.e: Durin',
      labelText: 'Name or Username',
      labelInputClass: 'reg',
      type: 'text'
    })}
    ${generateInput({
      id: 'email',
      type: 'email',
      placeholder: 'F.e: durin123@gmail.com',
      labelText: 'Email',
      labelInputClass: 'reg'
    })}
   ${generateInput({
     id: 'password',
     type: 'password',
     placeholder: '******',
     labelText: 'Password',
     labelInputClass: 'reg',
     extraContent:
       '<p class="pass-control">La contraseña debe tener al menos 6 caracteres</p>'
   })}
      
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

      await submitLogin({ email: userData.email, password: userData.password });
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
