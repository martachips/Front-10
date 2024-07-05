export const navigate = ({ e, page, path }) => {
  e.preventDefault();

  window.history.pushState('', '', path);

  page();
};
