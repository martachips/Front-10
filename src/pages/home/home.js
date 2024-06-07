import { routes } from '../../components/data/links';
import './home.css';

const main = document.querySelector('#main');
export const home = () => {
  main.innerHTML = '';

  printHome();
};

const printHome = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  main.innerHTML = `
  <div class="home-img"></div>
  <section class="home-section">
    <h2 class="homepage-description"> La web donde encontrar los mejores FESTIVALES </h2> 
    <section class="homepage-buttons">
      <button class= "home-button events-btn"> Ir a EVENTOS</button>
     ${
       !user
         ? '<button class="home-button register-button"> Registro</button>'
         : ''
     }
    </section>
  </section>`;

  const eventsBtn = document.querySelector('.events-btn');
  eventsBtn.addEventListener('click', routes[1].page);

  if (!user) {
    const registerBtn = document.querySelector('.register-button');
    if (registerBtn) {
      registerBtn.addEventListener('click', routes[4].page);
    }
  }
};
