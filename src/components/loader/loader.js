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
  const loaders = document.querySelectorAll('.loadership_WHYDT');
  loaders.forEach((loader) => {
    loader.classList.add('loaded');
  });
};
