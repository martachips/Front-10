import './style.css';
import { renderHeader } from './src/components/header/header';
import { footer } from './src/components/footer/footer';
import { popstate } from './src/utils/popstate';

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
});
popstate();
footer();
