import { createEvent } from '../../pages/createEvent/createEvent';
import { eventPage } from '../../pages/events/events';
import { home } from '../../pages/home/home';
import { login } from '../../pages/logIn/login';
import { showProfile } from '../../pages/profile/profile';
import { register } from '../../pages/register/register';

export const routes = [
  {
    text: 'Home',
    page: home
  },
  {
    text: 'Events',
    page: eventPage
  },
  {
    text: 'MyProfile',
    page: showProfile
  },
  {
    text: 'Create Event',
    page: createEvent
  },
  {
    text: 'Register',
    page: register
  },
  {
    text: 'LogIn',
    page: login
  }
];
