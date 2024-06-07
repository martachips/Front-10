import { User } from '../../components/user/user';
import './profile.css';

const main = document.querySelector('#main');
export const showProfile = () => {
  main.innerHTML = '';

  User();
};
