export const getToken = () => localStorage.getItem('token');
export const updateUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const displayMessage = (message, className) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageElement.className = className;
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
  main.append(messageElement);
};

export const displaySuccessMessage = (message) => {
  displayMessage(message, 'success-message');
};

export const displayErrorMessage = (message) => {
  displayMessage(message, 'error-message');
};
