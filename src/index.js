import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// ✅ Get the element that must exist in index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("❌ Could not find root element to mount React app.");
}
