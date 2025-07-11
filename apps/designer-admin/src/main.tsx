import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { initializeTheme, i18n } from '@frontend/shared';
import App from './app/app';

// Initialize theme and i18n
initializeTheme();

// Initialize i18n with stored language preference
const storedLanguage = localStorage.getItem('language');
if (storedLanguage && ['en', 'de'].includes(storedLanguage)) {
  i18n.changeLanguage(storedLanguage);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
