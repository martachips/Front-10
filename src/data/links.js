import { createEvent } from '../pages/createEvent/createEvent';
import { eventPage } from '../pages/events/events';
import { home } from '../pages/home/home';
import { login } from '../pages/logIn/login';
import { showProfile } from '../pages/profile/profile';
import { register } from '../pages/register/register';

export const routes = [
  {
    text: 'Home',
    page: home,
    path: '/home'
  },
  {
    text: 'Events',
    page: eventPage,
    path: '/events'
  },
  {
    text: 'MyProfile',
    page: showProfile,
    path: '/profile'
  },
  {
    text: 'Create Event',
    page: createEvent,
    path: '/createEvent'
  },
  {
    text: 'Register',
    page: register,
    path: '/register'
  },
  {
    text: 'LogIn',
    page: login,
    path: '/logIn'
  }
];
