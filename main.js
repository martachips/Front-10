import './style.css';
import { renderHeader } from './src/components/header/header';
import { footer } from './src/components/footer/footer';
import { routes } from './src/components/data/links';

// renderHeader();

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
});

footer();
