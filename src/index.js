import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import "../src/languages/i18n";

// TODO: get rid of strict mode
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
