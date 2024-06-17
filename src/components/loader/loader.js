import './loader.css';

const main = document.querySelector('.main');

export const loader = () => {
  const loader = document.createElement('div');
  loader.classList.add('loadership_WHYDT');
  loader.innerHTML = `
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  `;
  main.append(loader);
};

export const hideLoader = () => {
  const loader = document.querySelector('.loadership_WHYDT');
  loader.classList.add('loaded');
};
