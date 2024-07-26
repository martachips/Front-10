import { generateInput } from '../../components/forms/forms';
import { renderHeader } from '../../components/header/header';
import { userEndpoints } from '../../data/apiEndpoins';
import { routes } from '../../data/links';
import { API } from '../../utils/api';
import { displayErrorMessage } from '../../utils/functions';
import { home } from '../home/home';
import './login.css';

const main = document.querySelector('#main');
export const login = () => {
  main.innerHTML = '';

  createLoginForm();
};

const createLoginForm = () => {
  const loginSection = document.createElement('section');
  loginSection.classList.add('login-section');

  loginSection.innerHTML = `
    <form class="login-form">
      <h3 class="login-title">LOG IN</h3>
      ${generateInput({
        className: 'each-input-div',
        id: 'email',
        placeholder: 'F.e: durin123@gmail.com',
        required: true,
        labelText: 'Email',
        type: 'email',
        labelInputClass: 'login'
      })}
      ${generateInput({
        className: 'each-input-div',
        id: 'password',
        placeholder: '******',
        required: true,
        labelText: 'Password',
        type: 'password',
        labelInputClass: 'login'
      })}
      <button class="submit-btn">Log In</button>
    </form>
    <div class="not-registered">  
      <p>Todavía no tengo una cuenta</p>
      <button class="regist-btn">Registrarse</button>
    </div>
  `;

  main.append(loginSection);
  document.querySelector('#email').addEventListener('input', (e) => {
    e.target.value = e.target.value.toLowerCase();
  });

  const registBtn = document.querySelector('.regist-btn');
  registBtn.addEventListener('click', routes[4].page);

  const loginform = document.querySelector('.login-form');
  loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    submitLogin({ email, password });
  });
};

export const submitLogin = async ({ email, password }) => {
  const userObject = {
    email,
    password
  };

  try {
    const res = await API({
      endpoint: userEndpoints.loginRoute,
      method: 'POST',
      body: userObject
    });

    if (res) {
      const { token, user } = res;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      renderHeader();
      home();
    }
  } catch (error) {
    displayErrorMessage('Error al hacer LogIn. Email o contraseña incorrecta');

    console.error('Error al hacer Log In', error);
  }
};

export const logOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  renderHeader();
  window.location.href = '/';
  home();
};
