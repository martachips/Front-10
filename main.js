import './style.css';
import { renderHeader } from './src/components/header/header';
import { footer } from './src/components/footer/footer';

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
});

footer();
