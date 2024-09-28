import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { isProduction } from '@/const';
import { errorFallbackRender } from '@/utils';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallbackRender={errorFallbackRender}>
    {isProduction ? (
      <App />
    ) : (
      <StrictMode>
        <App />
      </StrictMode>
    )}
  </ErrorBoundary>,
);
