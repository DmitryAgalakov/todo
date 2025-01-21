import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto';
import { App } from './App';


createRoot(document.getElementById('react_root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
