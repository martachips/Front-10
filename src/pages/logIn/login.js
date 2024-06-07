import { userEndpoints } from '../../components/data/apiEndpoins';
import { routes } from '../../components/data/links';
import { renderHeader } from '../../components/header/header';
import { API } from '../../utils/api';
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
      <div class="each-input-div">
        <label class="label-email label-login" for="email">Email</label>
        <input class="input-name input-login" type="email" id="email" name="email" required placeholder="F.e: durin123@gmail.com"></input>
      </div>
      <div class="each-input-div">
        <label class="label-password label-login" for="password">Password</label>
        <input class="input-password input-login" type="password" id="password" name="password" required placeholder="******"></input>  
      </div>
      <button class="submit-btn">Log In</button>

    </form>
    <div class="not-registered">  
      <p>Todavía no tengo una cuenta</p>
      <button class="regist-btn">Registrarse</button>
    </div>
  `;

  main.append(loginSection);

  const registBtn = document.querySelector('.regist-btn');
  registBtn.addEventListener('click', routes[4].page);

  const loginform = document.querySelector('.login-form');
  loginform.addEventListener('submit', submitLogin);
};

const submitLogin = async (e) => {
  e.preventDefault();

  const userObject = {
    email: e.target[0].value,
    password: e.target[1].value
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
      console.log(token, user);
      console.log('Log In realizado con éxito ', res);
      renderHeader();
      home();
    }
  } catch (error) {
    console.error('Error al hacer Log In', error);
  }
};

export const logOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  renderHeader();
  window.location.href = routes[0].page;
  home();
};
