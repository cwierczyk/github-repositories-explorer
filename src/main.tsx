import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root')!).render(
  import.meta.env.PROD ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  ),
);
