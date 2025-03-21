import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // ✅ Make sure this file exists in /src

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("❌ No root element found in index.html");
}
