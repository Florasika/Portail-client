import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App.js';
// import reportWebVitals from './reportWebVitals'; // Cette ligne reste commentée, car vous ne l'utilisez pas

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Supprimez l'appel à reportWebVitals()


