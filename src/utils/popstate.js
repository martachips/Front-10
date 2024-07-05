import { routes } from '../data/links';

export const popstate = () => {
  window.addEventListener('popstate', () => {
    const route = routes.find(
      (route) => route.path === window.location.pathname
    );
    if (route && route.page) {
      route.page();
    }
  });
};
