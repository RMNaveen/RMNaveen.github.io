import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import App from './App';
import './index.css';

// Get the stored theme preference
const storedTheme = localStorage.getItem('theme-preference') || 'light';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider defaultTheme={storedTheme}>
      <ToastProvider />
      <App />
    </HeroUIProvider>
  </React.StrictMode>,
);
