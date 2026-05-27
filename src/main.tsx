import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global custom validation messages in Georgian
if (typeof document !== 'undefined') {
  document.addEventListener('invalid', (e: any) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      e.target.setCustomValidity('გთხოვთ სწორად შეავსოთ ველი');
    }
  }, true);

  document.addEventListener('input', (e: any) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      e.target.setCustomValidity('');
    }
  });

  document.addEventListener('change', (e: any) => {
    if (e.target.tagName === 'SELECT') {
      e.target.setCustomValidity('');
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

